const express = require('express')

module.exports = function(server) {

	// API Routes
	const router = express.Router()
	server.use('/api', router)

	// Lancheteria Routes
	const restaurantsService = require('../api/lancheteria/restaurants.service')
	restaurantsService.register(router, '/restaurants')
}
