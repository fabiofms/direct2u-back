const config = require('config');
const mailjet = require ('node-mailjet')
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth');
const { findByIdAndUpdate } = require('../../models/Product');
const Sale = require('../../models/Sale')
const User = require('../../models/User')
const Product = require('../../models/Product')
const Client = require('../../models/Client')

// @route   POST api/sale
// @desc    Create a sale
// @access  Private

router.post("/", [
    auth,
    [
        check('client', 'Sale must have a client')
            .not()
            .isEmpty(),
        check('products', 'Enter at least one product').isArray({min: 1})
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    try {
        const { client: clientId, products } = req.body
        // Get client information
        const clientDB = await Client.findById(clientId);
        const client = clientDB.name
        const email = clientDB.email
        console.log(email, client)
        // Calculate price and compose email message

        let price = 0
        let product
        for(let i=0; i < products.length; i++){
            product = await Product.findById(products[i].product)
            price += product.price*parseInt(products[i].quantity)
        }

        // Create new sale
        const saleFields = {
            ...req.body,
            user: req.user.id,
            price
        }

        sale = new Sale(saleFields)
        const s = await sale.save()
        
        res.json(s);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server Error'}]});
    }
}

)

// @route   GET api/sale/email/:id
// @desc    Create a sale
// @access  Private

router.get("/email/:id", [
    auth,
],
async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if(!sale) {
            return res.status(404).json({errors: [{ msg: 'Sale not found'}]})
        }
        const { client: clientId, products, price } = sale

        // Get client information
        const clientDB = await Client.findById(clientId);
        const client = clientDB.name
        const email = clientDB.email
        console.log(email, client)
        // Calculate price and compose email message

        let message = '<h3>Quantidade Produto  Valor Unitário  Valor Total'
        let product
        let line
        for(let i=0; i < products.length; i++){
            product = await Product.findById(products[i].product)
            line = `<p>${products[i].quantity} ${product.name} ${(product.price).toFixed(2)}\
             ${(product.price*parseInt(products[i].quantity)).toFixed(2)}</p>`
            message = message + line
        }
        message += `<p>Preço total: ${price.toFixed(2)}</p>`
        message = "<h2>Olá " + client + ". Segue o seu orçamento solicitado.</h2>" + message

        // Send email
        const mailjetPubKey = config.get("mailjetPubKey")
        const mailjetSecKey = config.get("mailjetSecKey")
        const user = await User.findById(req.user.id)
        
        const mailjet = require ('node-mailjet')
            .connect(mailjetPubKey, mailjetSecKey)
        const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
            "Messages":[
                {
                "From": {
                    "Email": user.email,
                    "Name": user.name
                },
                "To": [
                    {
                    "Email": email,
                    "Name": client
                    }
                ],
                "Subject": "Orçamento Aloés",
                "TextPart": "Olá " + client + ". Segue o seu orçamento solicitado",
                "HTMLPart": message,
                "CustomID": "AppGettingStartedTest"
                }
            ]
            })
        request
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })


        res.json({message:['Success']});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server Error'}]});
    }
}

)

// @route   GET api/sale
// @desc    Get all sales
// @access  Private

router.get("/", auth, async (req, res) => {
    try {
        const sales = await Sale.find({user: req.user.id})
            .sort({date: -1})
            .populate('client', ['name', '_id']);
        res.json(sales);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
})

// @route   GET api/sale/:id
// @desc    Get sale by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if(!sale) {
            return res.status(404).json({errors: [{ msg: 'Sale not found'}]})
        }
        res.json(sale);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({errors: [{ msg: 'Sale not found'}]})
        }
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
})

// @route   PUT api/sale
// @desc    Update a sale
// @access  Private
// @todo

router.put("/:id", [
    auth,
        [
            check('client', 'Sale must have a client')
                .not()
                .isEmpty(),
            check('products', 'Enter at least one product').isArray({min: 1})
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        try {
            const { client: clientId, products } = req.body
            var sale = await Sale.findById(req.params.id)
            if(!sale) {
                return res.status(400).json({errors: [{msg: 'Sale does not exist'}]});
            }

            if(sale.user.toString() !== req.user.id){
                return res.status(400).json({errors: [{ msg: 'Sale belongs to other user'}]})
            }

            // Get client information
            const clientDB = await Client.findById(clientId);
            const client = clientDB.name
            const email = clientDB.email
            console.log(email, client)
            // Calculate price and compose email message

            let price = 0
            let message = '<h3>Quantidade Produto  Valor Unitário  Valor Total'
            let product
            let line
            for(let i=0; i < products.length; i++){
                product = await Product.findById(products[i].product)
                line = `<p>${products[i].quantity} ${product.name} ${(product.price).toFixed(2)}\
                ${(product.price*parseInt(products[i].quantity)).toFixed(2)}</p>`
                message = message + line
                price += product.price*parseInt(products[i].quantity)
            }
            message += `<p>Preço total: ${price.toFixed(2)}</p>`
            message = "<h2>Olá " + client + ". Segue o seu orçamento solicitado.</h2>" + message

            // Create new sale
            const saleFields = {
                ...req.body,
                user: req.user.id,
                price
            }
            const s = await Sale.findByIdAndUpdate(req.params.id, saleFields)
            // sale = new Sale(saleFields)
            // const s = await sale.save()

            // Send email
            const mailjetPubKey = config.get("mailjetPubKey")
            const mailjetSecKey = config.get("mailjetSecKey")
            const user = await User.findById(req.user.id)
            
            const mailjet = require ('node-mailjet')
                .connect(mailjetPubKey, mailjetSecKey)
            const request = mailjet
                .post("send", {'version': 'v3.1'})
                .request({
                "Messages":[
                    {
                    "From": {
                        "Email": user.email,
                        "Name": user.name
                    },
                    "To": [
                        {
                        "Email": email,
                        "Name": client
                        }
                    ],
                    "Subject": "Orçamento Aloés",
                    "TextPart": "Olá " + client + ". Segue o seu orçamento solicitado",
                    "HTMLPart": message,
                    "CustomID": "AppGettingStartedTest"
                    }
                ]
                })
            request
                .then((result) => {
                    console.log(result.body)
                })
                .catch((err) => {
                    console.log(err.statusCode)
                })


            res.json(s);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({errors: [{msg: 'Server Error'}]});
        }
    }

)

// @route   DELETE api/sale/:id
// @desc    Delete a sale
// @access  Private

router.delete("/:id", auth, async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);

        if(!sale) {
            return res.status(404).json({errors: [{ msg: 'Sale not found'}]})
        }
        // Check product
        if(sale.user.toString() !== req.user.id) {
            return res.status(401).json({errors: [{ msg: 'User not authorized' }]});
        }

        await sale.remove();

        res.json({ msg: 'Sale removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{ msg: 'Server Error'}]});
    }
})

module.exports = router;