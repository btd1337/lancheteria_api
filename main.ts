import { Server } from "./server/server";
import { usersRouter } from './users/users.router';

const server = new Server();

server
  .bootstrap([usersRouter])
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
