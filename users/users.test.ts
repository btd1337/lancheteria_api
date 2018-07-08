// tslint:disable-next-line:no-implicit-dependencies
import 'jest'
import * as mongoose from 'mongoose'
// tslint:disable-next-line:no-implicit-dependencies
import * as request from 'supertest'
import { environment } from './../common/environments'
import { Server } from './../server/server'
import { user } from './users.model'
import { usersRouter } from './users.router'

let server: Server
beforeAll(() => {
	environment.db.url =
		process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
	environment.server.port = process.env.SERVER_PORT || 3001

	server = new Server()
	return server
		.bootstrap([usersRouter])
		.then(() => user.remove({}).exec())
		.catch(console.error)
})

const userTest = {
	cpf: '563.115.830-20',
	email: 'usuario@email.com',
	name: 'usuario',
	password: '123456'
}

test('get /users', () => {
	return request(environment.server.url)
		.get('/users')
		.then((response) => {
			expect(response.status).toBe(200)
			expect(response.body.items).toBeInstanceOf(Array)
		})
		.catch(fail)
})

test('post /users', () => {
	return request(environment.server.url)
		.post('/users')
		.send({
			cpf: userTest.cpf,
			email: userTest.email,
			name: userTest.name,
			password: userTest.password
		})
		.then((response) => {
			expect(response.status).toBe(200)
			expect(response.body._id).toBeDefined()
			expect(response.body.cpf).toBe(userTest.cpf)
			expect(response.body.email).toBe(userTest.email)
			expect(response.body.name).toBe(userTest.name)
			expect(response.body.password).toBeUndefined()
		})
		.catch(fail)
})

afterAll(() => {
	return server.shutdown()
})
