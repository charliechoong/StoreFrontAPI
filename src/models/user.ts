// @ts-ignore
import client from "../../database"

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class Users {
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
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES(($1), ($2), ($3)) RETURNING *'

            const result = conn.query(sql, [u.firstName, u.lastName, u.password])
            conn.release()
            return (await result).rows[0]
        } catch (err) {
            throw new Error(`Could not create new user. Error: ${err}`)
        }
    }
}