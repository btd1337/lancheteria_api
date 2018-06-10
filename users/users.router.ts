import * as restify from "restify";
import { Router } from "../common/router";
import { User } from "./users.model";

class UsersRouter extends Router {
  public applyRoutes(application: restify.Server) {
    // getAll
    application.get("/users", (req, resp, next) => {
      User.findAll().then(users => {
        resp.json(users);
        return next();
      });
    });

    // getOne
    application.get("/users/:id", (req, resp, next) => {
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
  }
}

export const usersRouter = new UsersRouter();
