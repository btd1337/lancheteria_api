import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-routers';
import { handleError } from './../server/error.handler';
import { mergePatchBodyParser } from './../server/merge-patch.parser';
import { Review } from './reviews.model';

class ReviewsRouter extends ModelRouter<Review> {
  constructor() {
    super(Review);
  }

  public findById = (req, resp, next) => {
    this.model
      .findById(req.params.id)
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .then(this.render(resp, next))
      .catch(next);
  }

  public applyRoutes(application: restify.Server) {
    application.get('/reviews', this.findAll);
    application.get('/reviews/:id', [this.validateId, this.findById]);
    application.post('/reviews', this.save);
    application.put('/reviews/:id', [this.validateId, this.replace]);
    application.patch('/reviews/:id', [this.validateId, this.update]);
    application.del('/reviews/:id', [this.validateId, this.delete]);
  }
}

export const reviewsRouter = new ReviewsRouter();
