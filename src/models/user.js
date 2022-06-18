"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get user of id ${id}. Error ${err}`);
        }
    }
    async create(u) {
        try {
            dotenv_1.default.config();
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password_digest) VALUES(($1), ($2), ($3)) RETURNING *';
            const password_hash = bcrypt_1.default.hashSync(u.password_raw + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS || "1"));
            const result = await conn.query(sql, [u.firstName, u.lastName, password_hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create user ${u.firstName}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
