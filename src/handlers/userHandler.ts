import express, { Request, Response, Router as router } from 'express'
import { User, UserStore } from '../models/user'

const store = new UserStore()

const userRoutes = router()

// route handlers
const index = async (req: Request, res: Response): Promise<void> => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response): Promise<void> => {
    const user = await store.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password_raw: req.body.password_raw,
        }
        const newUser = await store.create(user)
        res.json(newUser)

    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

// const userRoutes = (app: express.Application) => {
//     console.log(app)
//     app.get('/users', index)
//     app.get('/users/:id', show)
//     app.post('/users', create)
// }
userRoutes.get('/users', index)

export default userRoutes