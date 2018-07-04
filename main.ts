import { rootRouter } from './common/root-router'
import { restaurantsRouter } from './restaurants/restaurants.router'
import { reviewsRouter } from './reviews/reviews.router'
import { Server } from './server/server'
import { usersRouter } from './users/users.router'

const server = new Server()

server
	.bootstrap([restaurantsRouter, reviewsRouter, usersRouter])
	.then((auxServer) => {
		// tslint:disable-next-line:no-console
		console.log('Server is listening on:', auxServer.getApplication().address())
	})
	.catch((error) => {
		// tslint:disable-next-line:no-console
		console.error('Server failed to start', error)
		process.exit(1)
	})
