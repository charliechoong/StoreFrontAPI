"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_products_1 = require("../../models/order-products");
const store = new order_products_1.OrderProductStore();
describe('OrderProduct Store', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a index by orderId method', () => {
        expect(store.indexOrderId).toBeDefined();
    });
    it('should have a addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });
});
