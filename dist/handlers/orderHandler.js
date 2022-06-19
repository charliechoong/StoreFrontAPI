"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../models/order");
const order_products_1 = require("../models/order-products");
const utilities_1 = require("../utilities");
const store = new order_1.OrderStore();
const orderProductStore = new order_products_1.OrderProductStore();
const orderRoutes = (0, express_1.Router)();
// route handlers
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
};
const create = async (req, res) => {
    try {
        const order = {
            userId: Number(req.params.userId),
            status: "active"
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const addProduct = async (req, res) => {
    try {
        const newProductOrder = await orderProductStore.addProduct(req.params.order_id, req.body.product_id, req.body.quantity);
        res.json(newProductOrder);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
orderRoutes.get('/orders/:id?:token', utilities_1.authenticate, show);
orderRoutes.post('/orders', utilities_1.authenticate, create);
orderRoutes.post('/orders/:order_id/products', utilities_1.authenticate, addProduct);
exports.default = orderRoutes;
