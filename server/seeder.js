import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './modules/userModule.js'
import Product from './modules/productModule.js'
import Order from './modules/orderModule.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createUsers = await User.insertMany(users)

        const adminUser = createUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold)
        process.exit()
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroy!'.red.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold)
        process.exit()
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}