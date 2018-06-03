import * as restify from "restify";
import { environment } from "../common/environments";

export class Server {
  private application: restify.Server;

  public bootstrap(): Promise<Server> {
    return this.initRoutes().then(() => this);
  }

  public initRoutes(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: "lancheteria-api",
          version: "1.0.0"
        });

        this.application.use(restify.plugins.queryParser());

        // routes here

        this.application.listen(environment.server.port, () => {
          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public getApplication() {
    return this.application;
  }
}
