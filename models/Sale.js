const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'},
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                default: 0
            },
        }
    ],
    client: {
        type: String
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'client'
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number
    },
    done: {
        type: Boolean,
        default: false
    }
})

const Sale = mongoose.model('sale', saleSchema)

module.exports = Sale;