import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Test for GET /users', () => {
    it('should return status code 200', async () => {
        const response = await request.get('/users')
        expect(response.status).toEqual(200)
    })
})