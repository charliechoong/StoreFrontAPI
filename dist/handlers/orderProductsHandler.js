"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_products_1 = require("../models/order-products");
const utilities_1 = require("../utilities");
const store = new order_products_1.OrderProductStore();
const orderProductRoutes = (0, express_1.Router)();
// route handlers
const indexOrderId = async (req, res) => {
    const order = await store.indexOrderId(req.params.id);
    res.json(order);
};
orderProductRoutes.get('/orders/:id', utilities_1.authenticate, indexOrderId);
exports.default = orderProductRoutes;
