const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'company'
    }
})

const Product = mongoose.model('product', productSchema)

module.exports = Product;