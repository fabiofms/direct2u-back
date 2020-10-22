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

// @route   POST api/sale
// @desc    Create a sale
// @access  Private

router.post("/", [
    auth,
    [
        check('client', 'Sale must have a client')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('products', 'Enter at least one product').isArray({min: 1})
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    
    try {
        const { client, email, products } = req.body

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

        sale = new Sale(saleFields)
        const s = await sale.save()

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
        res.status(500).json([{msg: 'Server Error'}]);
    }
}

)

// @route   GET api/sale
// @desc    Get all sales
// @access  Private

router.get("/", auth, async (req, res) => {
    try {
        const sales = await Sale.find({user: req.user.id}).sort({date: -1});
        res.json(sales);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server error'});
    }
})

// @route   GET api/product/:id
// @desc    Get product by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({ msg: 'Product not found'})
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found'})
        }
        res.status(500).send('Server Error');
    }
})

// @route   POST api/product
// @desc    Create a product
// @access  Private

router.put("/:id", [
    auth,
    [
        check('name')
            .not()
            .isEmpty()
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    
    try {
        const { name, type } = req.body
        var product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(400).send({msg: 'Product does not exist'});
        }

        await Product.findByIdAndUpdate(req.params.id, { name, type})

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json([{msg: 'Server Error'}]);
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
            return res.status(404).json({ msg: 'Sale not found'})
        }
        // Check product
        if(sale.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await sale.remove();

        res.json({ msg: 'Sale removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error'});
    }
})

module.exports = router;