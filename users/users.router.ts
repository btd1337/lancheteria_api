import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { Router } from '../common/router';
import { User } from './users.model';

class UsersRouter extends Router {
  constructor() {
    super();
    this.on('beforeRender', document => {
      document.password = undefined;
    });
  }
  public applyRoutes(application: restify.Server) {
    // getAll
    application.get('/users', (req, resp, next) => {
      User.find()
        .then(this.render(resp, next))
        .catch(next);
    });

    // getOne
    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id)
        .then(this.render(resp, next))
        .catch(next);
    });

    // createOne
    application.post('/users', (req, resp, next) => {
      const user = new User(req.body);
      user
        .save()
        .then(this.render(resp, next))
        .catch(next);
    });

    // editOne
    application.put('/users/:id', (req, resp, next) => {
      const options = { overwrite: true, runValidators: true };
      User.update({ _id: req.params.id }, req.body, options)
        .exec()
        .then(result => {
          if (result.n) {
            User.findById(req.params.id)
              .exec()
              .then(iuser => {
                return iuser;
              });
          } else {
            throw new NotFoundError('Documento não encontrado!');
          }
        })
        .then(this.render(resp, next))
        .catch(next);
    });

    // editOne
    application.patch('/users/:id', (req, resp, next) => {
      const options = { new: true, runValidators: true }; // to receive new object created
      User.findByIdAndUpdate(req.params.id, req.body, options)
        .then(this.render(resp, next))
        .catch(next);
    });

    application.del('/users/:id', (req, resp, next) => {
      User.deleteOne({ _id: req.params.id })
        .exec()
        .then(cmdResult => {
          // n=1 found | n=0 not found
          if (cmdResult.n) {
            resp.send(204);
          } else {
            throw new NotFoundError('Documento não encontrado!');
          }
          return next();
        })
        .catch(next);
    });
  }
}

export const usersRouter = new UsersRouter();
