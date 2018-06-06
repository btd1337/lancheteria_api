import * as restify from "restify";
import { environment } from "../common/environments";
import { Router } from "../common/router";

export class Server {
  private application: restify.Server;

  public constructor(){
    this.application = restify.createServer();
  }

  public bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initRoutes(routers).then(() => this);
  }

  public initRoutes(routers: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: "lancheteria-api",
          version: "1.0.0"
        });

        this.application.use(restify.plugins.queryParser());

        // routes here
        for (const router of routers){
          router.applyRoutes(this.application)
        }

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
