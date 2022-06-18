// @ts-ignore
import client from "../database"

export type Product = {
    id: number;
    name: string;
    price: number;
}

export class Products {
    
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products'
            const conn = await client.connect()
            const result = conn.query(sql)

            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get all products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const conn = await client.connect()
            const result = conn.query(sql, [id])

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get product of id ${id}. Error: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES (($1), ($2)) RETURNING *'
            const conn = await client.connect()
            const result = conn.query(sql, [p.name, p.price])

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not create new product. Error: ${err}`)
        }
    }
}