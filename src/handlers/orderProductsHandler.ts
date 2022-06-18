import express, { Request, Response, Router as router } from 'express'
import { OrderProduct, OrderProductStore } from '../models/order-products'

const store = new OrderProductStore()

const orderProductRoutes = router()

// route handlers
const indexOrderId = async (req: Request, res: Response): Promise<void> => {
    const order = await store.indexOrderId(req.params.id)
    res.json(order)
}

orderProductRoutes.get('/orders/:id', indexOrderId)

export default orderProductRoutes