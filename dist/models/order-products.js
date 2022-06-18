"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderProductStore {
    async index() {
        try {
            const sql = 'SELECT * FROM order_products';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not retrieve due to error ${err}`);
        }
    }
    async indexOrderId(oid) {
        try {
            const sql = 'SELECT * FROM order_products WHERE order_id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [oid]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not retrieve rows with oid ${oid} due to error ${err}`);
        }
    }
    async addProduct(oid, pid, quantity) {
        try {
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES (($1), ($2), ($3))';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [oid, pid, quantity]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add product to order. Error: ${err}`);
        }
    }
}
exports.OrderProductStore = OrderProductStore;
