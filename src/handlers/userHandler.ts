import express, { Request, Response, Router as router } from 'express'
import { User, UserStore } from '../models/user'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { authenticate } from '../utilities'

dotenv.config()

const store = new UserStore()

const userRoutes = router()

// route handlers
const index = async (req: Request, res: Response): Promise<void> => {
    // Authenticate user
    authenticate(req, res)

    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response): Promise<void> => {
    // Authenticate user
    authenticate(req, res)

    const user = await store.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response): Promise<void> => {
    // Authenticate user
    authenticate(req, res)

    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password_raw: req.body.password_raw,
        }
        const newUser = await store.create(user)

        // Create and return JWT token for user
        const token = jwt.sign({ user: newUser }, process.env.SECRET_TOKEN!)
        res.json(token)

    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

// const userRoutes = (app: express.Application) => {
//     app.get('/users', index)
//     app.get('/users/:id', show)
//     app.post('/users', create)
// }
userRoutes.get('/users', index)
userRoutes.get('/users/:id', show)
userRoutes.post('/users', create)

export default userRoutes