import express, { Request, Response, Router as router } from 'express'
import { Order, OrderStore } from '../models/order'
import { OrderProductStore } from '../models/order-products'
import { authenticate } from '../utilities'

const store = new OrderStore()
const orderProductStore = new OrderProductStore()

const orderRoutes = router()

// route handlers
const show = async (req: Request, res: Response): Promise<void> => {
    const order = await store.show(req.params.id)
    res.json(order)
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const order: Order = {
            userId: Number(req.params.userId),
            status: "active"
        }
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400).json(err)
    }

}

const addProduct = async (req: Request, res: Response): Promise<void> => { 
    try {
        const newProductOrder = await orderProductStore.addProduct(req.params.order_id, req.body.product_id, req.body.quantity)
        res.json(newProductOrder)
    } catch (err) {
        res.status(400).json(err)
    }
}

orderRoutes.get('/orders/:id?:token', authenticate, show)
orderRoutes.post('/orders', authenticate, create)
orderRoutes.post('/orders/:order_id/products', authenticate, addProduct)

export default orderRoutes