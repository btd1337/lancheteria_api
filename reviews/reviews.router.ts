import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { ModelRouter } from '../common/model-routers'
import { handleError } from './../server/error.handler'
import { mergePatchBodyParser } from './../server/merge-patch.parser'
import { review } from './reviews.model'

class ReviewsRouter extends ModelRouter<Review> {
	constructor() {
		super(review)
	}

	public envelope(document) {
		const resource = super.envelope(document)
		const restaurantId = document.restaurant._id
			? document.restaurant._id
			: document.restaurant
		resource._links.restaurant = `/restaurants/${restaurantId}`
		return resource
	}

	public findById = (req, resp, next) => {
		this.model
			.findById(req.params.id)
			.populate('user', 'name')
			.populate('restaurant', 'name')
			.then(this.render(resp, next))
			.catch(next)
	}

	public applyRoutes(application: restify.Server) {
		application.get(`${this.basePath}`, this.findAll)
		application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
		application.post(`${this.basePath}`, this.save)
		application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
		application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
		application.del(`${this.basePath}/:id`, [this.validateId, this.delete])
	}
}

export const reviewsRouter = new ReviewsRouter()
