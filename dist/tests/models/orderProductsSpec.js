"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_products_1 = require("../../models/order-products");
const store = new order_products_1.OrderProductStore();
describe('OrderProduct Store', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });
});
