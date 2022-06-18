// @ts-ignore
import client from '../database'

export type OrderProduct = {
    id: number;
    order_id: string;
    product_id: string;
    quantity: number;
}
export class OrderProductStore {
    async index(): Promise<OrderProduct[]> {
        try {
            const sql = 'SELECT * FROM order_products'
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not retrieve due to error ${err}`)
        }
    }

    async indexOrderId(oid: string): Promise<OrderProduct[]> {
        try {
            const sql = 'SELECT * FROM order_products WHERE order_id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [oid])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not retrieve rows with oid ${oid} due to error ${err}`)
        }
    }

    async addProduct(oid: string, pid: string, quantity: number): Promise<OrderProduct> {
        try {
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES (($1), ($2), ($3))'
            const conn = await client.connect()
            const result = await conn.query(sql, [oid, pid, quantity])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add product to order. Error: ${err}`)
        }
    }
}