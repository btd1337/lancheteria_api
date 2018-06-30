import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-routers';
import { handleError } from './../server/error.handler';
import { mergePatchBodyParser } from './../server/merge-patch.parser';
import { Restaurant } from './restaurants.model';

class RestaurantsRouter extends ModelRouter<Restaurant> {
  constructor() {
    super(Restaurant);
  }

  public findMenu = (req, resp, next) => {
    Restaurant.findById(req.params.id, '+menu')
      .then(restaurant => {
        if (!restaurant) {
          throw new NotFoundError('Restaurant not found');
        } else {
          resp.json(restaurant.menu);
          next();
        }
      })
      .catch(next);
  }

  public replaceMenu = (req, resp, next) => {
    Restaurant.findById(req.params.id, '+menu')
      .then(restaurant => {
        if (!restaurant) {
          throw new NotFoundError('Restaurant not found');
        } else {
          restaurant.menu = req.body;
          return restaurant.save();
        }
      })
      .then(restaurant => {
        resp.json(restaurant.menu);
      })
      .catch(next);
  }

  public applyRoutes(application: restify.Server) {
    application.get('/restaurants', this.findAll);
    application.get('/restaurants/:id', [this.validateId, this.findById]);
    application.post('/restaurants', this.save);
    application.put('/restaurants/:id', [this.validateId, this.replace]);
    application.patch('/restaurants/:id', [this.validateId, this.update]);
    application.del('/restaurants/:id', [this.validateId, this.delete]);

    application.get('/restaurants/:id/menu', [this.validateId, this.findMenu]);
    application.put('/restaurants/:id/menu', [
      this.validateId,
      this.replaceMenu
    ]);
  }
}

export const restaurantsRouter = new RestaurantsRouter();
