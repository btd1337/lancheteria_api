"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const restify = require("restify");
const environments_1 = require("../common/environments");
class Server {
    constructor() {
        this.application = restify.createServer();
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
    initializeDb() {
        return mongoose.connect(environments_1.environment.db.url);
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: "lancheteria-api",
                    version: "1.0.0"
                });
                this.application.use(restify.plugins.queryParser());
                // routes here
                for (const router of routers) {
                    router.applyRoutes(this.application);
                }
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