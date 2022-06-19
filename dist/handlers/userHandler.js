"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const utilities_1 = require("../utilities");
dotenv_1.default.config();
const store = new user_1.UserStore();
const userRoutes = (0, express_1.Router)();
// route handlers
const index = async (req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password_raw: req.body.password_raw,
        };
        const newUser = await store.create(user);
        // Create and return JWT token for user
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.SECRET_TOKEN);
        res.json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
// const userRoutes = (app: express.Application) => {
//     app.get('/users', index)
//     app.get('/users/:id', show)
//     app.post('/users', create)
// }
userRoutes.get('/users', utilities_1.authenticate, index);
userRoutes.get('/users/:id', utilities_1.authenticate, show);
userRoutes.post('/users', utilities_1.authenticate, create);
exports.default = userRoutes;
