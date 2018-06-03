"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const server = new server_1.Server();
server
    .bootstrap()
    .then(auxServer => {
    console.log("Server is listening on:", auxServer.getApplication().address());
})
    .catch(error => {
    console.error("Server failed to start", error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map