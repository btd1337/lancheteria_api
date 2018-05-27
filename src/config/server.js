const express = require('express')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const cors = require('cors')
const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

server.listen(PORT, function() {
	console.log(`Backend is running on PORT ${ PORT }`)
})

module.exports = server

