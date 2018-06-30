import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-routers';
import { handleError } from './../server/error.handler';
import { User } from './users.model';

class UsersRouter extends ModelRouter<User> {
  constructor() {
    super(User);
    this.on('beforeRender', document => {
      document.password = undefined;
    });
  }
  public applyRoutes(application: restify.Server) {
    // getAll
    application.get('/users', this.findAll);
    // getOne
    application.get('/users/:id', [this.validateId, this.findById]);
    // createOne
    application.post('/users', this.save);
    // editOne
    application.put('/users/:id', [this.validateId, this.replace]);
    // editOne
    application.patch('/users/:id', [this.validateId, this.update]);
    // deleteOne
    application.del('/users/:id', [this.validateId, this.delete]);
  }
}

export const usersRouter = new UsersRouter();
