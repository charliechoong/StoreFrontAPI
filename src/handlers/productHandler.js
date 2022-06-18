"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../models/product");
const productRoutes = (0, express_1.Router)();
const productStore = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const products = await productStore.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productStore.show(id);
        res.json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    try {
        const newProduct = await productStore.create({
            name: req.body.name,
            price: Number(req.body.price)
        });
        res.json(newProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
productRoutes.get('/products', index);
productRoutes.get('/products/:id', show);
productRoutes.post('/products', create);
exports.default = productRoutes;
