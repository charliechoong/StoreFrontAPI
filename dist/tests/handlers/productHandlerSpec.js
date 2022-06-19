"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TEST_JWT_TOKEN } = process.env;
const request = (0, supertest_1.default)(server_1.default);
describe('Tests for /products', () => {
    it('GET /products should return status code 200', async () => {
        const response = await request.get('/products');
        expect(response.status).toEqual(200);
    });
    // Implement /delete so cleanup to prevent conflict with other tests
    // it('POST /products should return status code 200', async () => {
    //     const response = await request.post('/products').set('Authorization', 'Bearer ' + TEST_JWT_TOKEN).send({
    //         name: "Apple",
    //         price: '0.7'
    //     })
    //     expect(response.status).toEqual(200)
    // })
});
