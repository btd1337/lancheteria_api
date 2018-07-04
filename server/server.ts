import * as mongoose from 'mongoose'
import * as restify from 'restify'
import { environment } from '../common/environments'
import { Router } from '../common/router'
import { handleError } from './error.handler'
import { mergePatchBodyParser } from './merge-patch.parser'

export class Server {
	private application: restify.Server

	public constructor() {
		this.application = restify.createServer()
	}

	public bootstrap(routers: Router[] = []): Promise<Server> {
		return this.initializeDb().then(() =>
			this.initRoutes(routers).then(() => this)
		)
	}

	public initializeDb() {
		return mongoose.connect(environment.db.url)
	}

	public initRoutes(routers: Router[]): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this.application = restify.createServer({
					name: 'lancheteria-api',
					version: '1.0.0'
				})

				this.application.use(restify.plugins.queryParser())
				this.application.use(restify.plugins.bodyParser())
				this.application.use(mergePatchBodyParser)

				// routes here
				for (const router of routers) {
					router.applyRoutes(this.application)
				}

				this.application.listen(environment.server.port, () => {
					resolve(this.application)
				})

				this.application.on('restifyError', handleError)
			} catch (error) {
				reject(error)
			}
		})
	}

	public getApplication() {
		return this.application
	}
}
