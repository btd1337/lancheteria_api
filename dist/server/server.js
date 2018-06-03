"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environments_1 = require("../common/environments");
class Server {
    bootstrap() {
        return this.initRoutes().then(() => this);
    }
    initRoutes() {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: "lancheteria-api",
                    version: "1.0.0"
                });
                this.application.use(restify.plugins.queryParser());
                // routes here
                this.application.listen(environments_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getApplication() {
        return this.application;
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map