'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const restaurants_router_1 = require('./restaurants/restaurants.router')
const reviews_router_1 = require('./reviews/reviews.router')
const server_1 = require('./server/server')
const users_router_1 = require('./users/users.router')
const server = new server_1.Server()
server
	.bootstrap([
		restaurants_router_1.restaurantsRouter,
		reviews_router_1.reviewsRouter,
		users_router_1.usersRouter
	])
	.then((auxServer) => {
		// tslint:disable-next-line:no-console
		console.log('Server is listening on:', auxServer.getApplication().address())
	})
	.catch((error) => {
		// tslint:disable-next-line:no-console
		console.error('Server failed to start', error)
		process.exit(1)
	})
//# sourceMappingURL=main.js.map
