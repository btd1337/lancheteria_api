'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose = require('mongoose')
const restify = require('restify')
const environments_1 = require('../common/environments')
const error_handler_1 = require('./error.handler')
const merge_patch_parser_1 = require('./merge-patch.parser')
class Server {
	constructor() {
		this.application = restify.createServer()
	}
	bootstrap(routers = []) {
		return this.initializeDb().then(() =>
			this.initRoutes(routers).then(() => this)
		)
	}
	initializeDb() {
		return mongoose.connect(environments_1.environment.db.url)
	}
	initRoutes(routers) {
		return new Promise((resolve, reject) => {
			try {
				this.application = restify.createServer({
					name: 'lancheteria-api',
					version: '1.0.0'
				})
				this.application.use(restify.plugins.queryParser())
				this.application.use(restify.plugins.bodyParser())
				this.application.use(merge_patch_parser_1.mergePatchBodyParser)
				// routes here
				for (const router of routers) {
					router.applyRoutes(this.application)
				}
				this.application.listen(environments_1.environment.server.port, () => {
					resolve(this.application)
				})
				this.application.on('restifyError', error_handler_1.handleError)
			} catch (error) {
				reject(error)
			}
		})
	}
	getApplication() {
		return this.application
	}
	shutdown() {
		return mongoose.disconnect().then(() => this.application.close())
	}
}
exports.Server = Server
//# sourceMappingURL=server.js.map
