import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../modules/userModule.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('token field')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Sz bzga obuna bomagansiz')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Admin sifatida ro\'yhatdan o\'tmagan!')
    }
}

export { protect, admin }