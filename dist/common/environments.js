'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.environment = {
	db: { url: process.env.DB_URL || 'mongodb://localhost/lancheteria-api' },
	security: { saltRounds: process.env.SALT_ROUNDS || 10 },
	server: {
		port: process.env.PORT || 3000,
		url: 'http://localhost:3001'
	}
}
//# sourceMappingURL=environments.js.map
