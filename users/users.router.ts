import * as restify from 'restify';
import { Router } from '../common/router';
import { User } from './users.model';

class UsersRouter extends Router {

  constructor(){
    super();
    this.on('beforeRender', document => {
      document.password = undefined;
    });
  }
  public applyRoutes(application: restify.Server) {
    // getAll
    application.get('/users', (req, resp, next) => {
      User.find().then(this.render(resp, next));
    });

    // getOne
    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id).then(this.render(resp,next));
    });

    // createOne
    application.post('/users', (req, resp, next) => {
      const user = new User(req.body);
      user.save().then(this.render(resp, next));
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
      }).then(this.render(resp, next));
    });

    // editOne
    application.patch('/users/:id', (req, resp, next) => {
      const options = { new: true };  // to receive new object created
      User.findByIdAndUpdate(req.params.id, req.body, options)
        .then(this.render(resp, next));
    });

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
