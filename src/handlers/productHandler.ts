import { json } from 'body-parser'
import express, { Request, Response, Router as router } from 'express'
import { ProductStore } from '../models/product'

const productRoutes = router()
const productStore = new ProductStore()

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productStore.index()
        res.json(products)
    } catch (err) {
        res.status(400).json(err)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const product = await productStore.show(id)
        res.json(product)
    } catch (err) {
        res.status(400).json(err)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProduct = await productStore.create({
            name: req.body.name,
            price: Number(req.body.price)
        })
        res.json(newProduct)
    } catch (err) {
        res.status(400).json(err)
    }
}

productRoutes.get('/products', index)
productRoutes.get('/products/:id', show)
productRoutes.post('/products', create)

export default productRoutes
