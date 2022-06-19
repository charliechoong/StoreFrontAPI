import { json } from 'body-parser'
import express, { Request, Response, Router as router } from 'express'
import { Product, ProductStore } from '../models/product'
import { authenticate } from '../utilities'

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
        const product: Product = {
            name: req.body.name,
            price: req.body.price
        }
        
        const newProduct = await productStore.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400).json(err)
    }
}

productRoutes.get('/products', index)
productRoutes.get('/products/:id', show)
productRoutes.post('/products', authenticate, create)

export default productRoutes
