import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

function authenticate(req: Request, res: Response, next: () => void) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader?.split(' ')[1]
        jwt.verify(token||'', process.env.SECRET_TOKEN!)
        next()
    } catch (err) {
        res.status(401).json(`Access denied. Invalid token.`)
        return;
    }
}

export { authenticate }