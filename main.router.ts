import * as restify from 'restify'
import { Router } from './common/router'

class MainRouter extends Router {
	public applyRoutes(application: restify.Server) {
		application.get('/', (req, resp, next) => {
			resp.json({
				restaurants: '/restaurants',
				reviews: '/reviews',
				users: '/users'
			})
		})
	}
}

export const mainRouter = new MainRouter()
