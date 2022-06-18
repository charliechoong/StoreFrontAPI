// @ts-ignore
import client from '../database'

export type OrderProduct = {
    id: number;
    order_id: string;
    product_id: string;
}
export class OrderProductsStore {
    async index(): Promise<OrderProduct[]> {
        try {
            const sql = 'SELECT * FROM order_products'
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not retrieve due to error ${err}`)
        }
    }

    async indexOrder(oid: string): Promise<OrderProduct[]> {
        try {
            const sql = 'SELECT * FROM order_products WHERE order_id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [oid])
            conn.conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not retrieve rows with oid ${oid} due to error ${err}`)
        }
    }
}