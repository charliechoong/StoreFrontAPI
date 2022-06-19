"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Store', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should create a new user', async () => {
        const result = await store.create({
            firstName: 'John',
            lastName: 'Doe',
            password_hash: 'Xa123'
        });
        expect(result).toEqual({
            id: 1,
            firstname: 'John',
            lastname: 'Doe',
            password_digest: 'Xa123'
        });
    });
    it('should show the existing user of id 1', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            firstname: 'John',
            lastname: 'Doe',
            password_digest: 'Xa123'
        });
    });
});
