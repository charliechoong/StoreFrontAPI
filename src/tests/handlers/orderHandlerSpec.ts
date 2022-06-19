import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Test for GET /order', () => {
    it('should return status code 401 due to unauthorization', async () => {
        const response = await request.get('/users')
        expect(response.status).toEqual(401)
    })
})