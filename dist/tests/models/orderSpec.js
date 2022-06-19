"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.OrderStore();
describe('Order Store', () => {
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should fail to create a new order and throw an error', async () => {
        expect(function () { store.create({ userId: 1000, status: 'active' }); }).toThrowError();
    });
});
