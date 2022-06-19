import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'

dotenv.config()
const { TEST_JWT_TOKEN } = process.env
const request = supertest(app)

describe('Tests for /products', () => {

    it('GET /products should return status code 200', async () => {
        const response = await request.get('/products')
        expect(response.status).toEqual(200)
    })

    // Implement /delete so cleanup to prevent conflict with other tests
    // it('POST /products should return status code 200', async () => {
    //     const response = await request.post('/products').set('Authorization', 'Bearer ' + TEST_JWT_TOKEN).send({
    //         name: "Apple",
    //         price: '0.7'
    //     })
    //     expect(response.status).toEqual(200)
    // })
})