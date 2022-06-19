"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get order of id ${id}. Error: ${err}`);
        }
    }
    async create(order) {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES (($1), ($2))';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order.userId, order.status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create new order for userId ${order.userId}. Errpr: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
