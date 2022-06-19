import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'

dotenv.config()
const request = supertest(app)
const { TEST_JWT_TOKEN } = process.env

describe('Test for GET /users', () => {
    it('should return status code 401 due to unauthorization', async () => {
        const response = await request.get('/users')
        expect(response.status).toEqual(401)
    })

    it('should return status code 200', async () => {
        const response = await request.get('/users').set('Authorization', 'Bearer ' + TEST_JWT_TOKEN)
        expect(response.status).toEqual(200)
    })
})