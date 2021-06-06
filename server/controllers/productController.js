import asyncHandler from "express-async-handler";
import Product from '../modules/productModule.js';

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductById  = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Mahsulot Topilmadi!')
    }
})

const deleteProduct  = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({ message: 'removed' })
    } else {
        res.status(404)
        throw new Error('Mahsulot Topilmadi!')
    }
})

const createProduct  = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Mahsulot nomi',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Brand',
        category: 'Category',
        countInStock: 1,
        numReviews: 0,
        description: 'Lorem ipsum dolor sit emet'
    })

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
})

const updateProduct  = asyncHandler(async (req, res) => {
    const {name,
        price,
        // user,
        image,
        brand,
        category,
        countInStock,
        // numReviews,
        description,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        // product.user = user
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        // product.numReviews = numReviews
        product.description = description

        const updatedProduct = await product.save()

        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProductReveiw  = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const allreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

        if(allreadyReviewed) {
            res.status(400)
            throw new Error('Siz allaqachon Baxoladingiz!')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save();
        res.status(201).json({ message: 'review created' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const getTopProducts  = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)

    res.json(products)
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReveiw, getTopProducts }