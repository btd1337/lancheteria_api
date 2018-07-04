import * as restify from 'restify'
import { ModelRouter } from '../common/model-routers'
import { user } from './users.model'

class UsersRouter extends ModelRouter<User> {
	constructor() {
		super(user)
		this.on('beforeRender', (document) => {
			document.password = undefined
		})
	}

	public findByEmail = (req, resp, next) => {
		if (req.query.email) {
			user
				.findByEmail(req.query.email)
				.then((auxUser) => (auxUser ? [auxUser] : [])) // converte para um array
				.then(this.renderAll(resp, next))
				.catch(next)
		} else {
			next()
		}
	}

	public applyRoutes(application: restify.Server) {
		application.get(
			'/users',
			restify.plugins.conditionalHandler([
				{
					handler: this.findAll,
					version: '1.0.0'
				},
				{
					handler: [this.findByEmail, this.findAll],
					version: '2.0.0'
				}
			])
		)
		application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
		application.post(`${this.basePath}`, this.save)
		application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
		application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
		application.del(`${this.basePath}/:id`, [this.validateId, this.delete])
	}
}

export const usersRouter = new UsersRouter()
