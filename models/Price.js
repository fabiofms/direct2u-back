const mongoose = require('mongoose')

const priceSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    cost: Number,
    price: Number,
    date: Date
})

const Price = mongoose.model('price', priceSchema)

module.exports = Price;