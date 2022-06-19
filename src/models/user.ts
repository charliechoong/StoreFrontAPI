// @ts-ignore
import client from "../database"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export type User = {
    firstName: string;
    lastName: string;
    password_raw: string;
}

export class UserStore {
    
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)

            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get user of id ${id}. Error ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO users (firstName, lastName, password_digest) VALUES(($1), ($2), ($3)) RETURNING *'

            const password_hash = bcrypt.hashSync(u.password_raw + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS||"1"))
            const result = await conn.query(sql, [u.firstName, u.lastName, password_hash])
            conn.release()
            
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not create user ${u.firstName}. Error: ${err}`)
        }
    }
}