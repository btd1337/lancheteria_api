"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_router_1 = require("./restaurants/restaurants.router");
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const server = new server_1.Server();
server
    .bootstrap([restaurants_router_1.restaurantsRouter, users_router_1.usersRouter])
    .then(auxServer => {
    console.log('Server is listening on:', auxServer.getApplication().address());
})
    .catch(error => {
    console.error('Server failed to start', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map