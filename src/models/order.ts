// @ts-ignore
import client from '../database'

export type Order = {
    userId: number;
    status: string;
}

export class OrderStore {
    async show(id: string) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])

            conn.release()
            return result.rows[0]          
        } catch (err) {
            throw new Error(`Could not get order of id ${id}. Error: ${err}`)
        }
    }

    async create(order: Order) {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES (($1), ($2))'
            const conn = await client.connect()
            const result = await conn.query(sql, [order.userId, order.status])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not create new order for userId ${order.userId}. Errpr: ${err}`)
        }
    } 
}