"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.default);
const { TEST_JWT_TOKEN } = process.env;
describe('Test for GET /users', () => {
    it('should return status code 401 due to unauthorization', async () => {
        const response = await request.get('/users');
        expect(response.status).toEqual(401);
    });
    it('should return status code 200', async () => {
        const response = await request.get('/users').set('Authorization', 'Bearer ' + TEST_JWT_TOKEN);
        expect(response.status).toEqual(200);
    });
});
