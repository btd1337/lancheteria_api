import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { ModelRouter } from '../common/model-routers'
import { restaurant } from './restaurants.model'

class RestaurantsRouter extends ModelRouter<Restaurant> {
	constructor() {
		super(restaurant)
	}

	public envelope(document) {
		const resource = super.envelope(document)
		resource._links.menu = `${this.basePath}/${resource._id}/menu`
		return resource
	}

	public findMenu = (req, resp, next) => {
		restaurant
			.findById(req.params.id, '+menu')
			.then((auxRestaurant) => {
				if (!auxRestaurant) {
					throw new NotFoundError('Restaurant not found')
				} else {
					resp.json(auxRestaurant.menu)
					next()
				}
			})
			.catch(next)
	}

	public replaceMenu = (req, resp, next) => {
		restaurant
			.findById(req.params.id, '+menu')
			.then((auxRestaurant) => {
				if (!auxRestaurant) {
					throw new NotFoundError('Restaurant not found')
				} else {
					restaurant.menu = req.body
					return restaurant.save()
				}
			})
			.then((auxRestaurant) => {
				resp.json(auxRestaurant.menu)
			})
			.catch(next)
	}

	public applyRoutes(application: restify.Server) {
		application.get(`${this.basePath}`, this.findAll)
		application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
		application.post(`${this.basePath}`, this.save)
		application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
		application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
		application.del(`${this.basePath}/:id`, [this.validateId, this.delete])

		application.get(`${this.basePath}/:id/menu`, [
			this.validateId,
			this.findMenu
		])
		application.put(`${this.basePath}/:id/menu`, [
			this.validateId,
			this.replaceMenu
		])
	}
}

export const restaurantsRouter = new RestaurantsRouter()
