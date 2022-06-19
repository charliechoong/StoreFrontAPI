"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        jsonwebtoken_1.default.verify(token || '', process.env.SECRET_TOKEN);
        next();
    }
    catch (err) {
        res.status(401).json(`Access denied. Invalid token.`);
        return;
    }
}
exports.authenticate = authenticate;
