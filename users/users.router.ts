import * as restify from 'restify';
import { Router } from '../common/router';
import { User } from './users.model';

class UsersRouter extends Router {
  public applyRoutes(application: restify.Server) {
    // getAll
    application.get('/users', (req, resp, next) => {
      User.find().then(users => {
        resp.json(users);
        return next();
      });
    });

    // getOne
    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id).then(user => {
        if (user) {
          resp.json(user);
          return next();
        } else {
          resp.send(400);
          return next();
        }
      });
    });

    // createOne
    application.post('/users', (req, resp, next) => {
      const user = new User(req.body);
      user.save().then(currentUser => {
        currentUser.password = undefined;
        resp.json(user);
        return next();
      });
    });

    // editOne
    application.put('/users/:id', (req, resp, next)=>{
      const options  = {overwrite: true};
      User.update({_id:req.params.id}, req.body, options)
          .exec().then(result=>{
            if(result.n){
              User.findById(req.params.id).exec()
                .then(iuser => {
                  return iuser;
                });
            }else{
              resp.send(404);
            }
      }).then(user =>{
        resp.json(user);
        return next();
      });
    });

    // editOne
    application.patch('/users/:id', (req, resp, next) => {
      const options = { new: true };  // to receive new object created
      User.findByIdAndUpdate(req.params.id, req.body, options)
        .then(user => {
          if(user) {
            resp.json(user);
            return next();
          } else {
            resp.send(404);
            return next();
          }
        });
    });

    /* application.del('/users/:id', (req, resp, next)=> {
      User.deleteOne({_id:req.params.id}).exec().then((cmdResult:any) => {
        if(cmdResult.result.n){
          resp.send(204);
        } else{
          resp.send(404);
        }
        return next();
      });
    }); */
    application.del('/users/:id', (req, resp, next)=> {
      User.deleteOne({_id:req.params.id}).exec().then(cmdResult => {
        if(cmdResult.n){  // n=1 found | n=0 not found
          resp.send(204);
        } else{
          resp.send(404);
        }
        return next();
      });
    }); 
  }
}

export const usersRouter = new UsersRouter();
