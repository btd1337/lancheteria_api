import { Server } from "./server/server";

const server = new Server();

server
  .bootstrap()
  .then(auxServer => {
    console.log(
      "Server is listening on:",
      auxServer.getApplication().address()
    );
  })
  .catch(error => {
    console.error("Server failed to start", error);
    process.exit(1);
  });
