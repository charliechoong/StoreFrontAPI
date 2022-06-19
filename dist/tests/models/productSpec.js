"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('create method should add a product', async () => {
        const product = {
            name: 'Apple',
            price: '0.7'
        };
        const result = await store.create(product);
        expect(result.name).toEqual('Apple');
        expect(result.price).toEqual('0.7');
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result.length).toEqual(1);
    });
});
