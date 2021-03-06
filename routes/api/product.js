const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth');
const Product = require('../../models/Product');
const Sale = require('../../models/Sale');

// @route   POST api/product
// @desc    Create a product
// @access  Private

router.post("/", [
    auth,
    [
        check('name', 'Fill the product name.')
            .not()
            .isEmpty(),
        check('price', 'Price must be a number')
            .isNumeric({locale: 'pt-BR'}),
        
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    
    try {
        const { name, price } = req.body
        var product = await Product.findOne({name, user: req.user.id})
        if(product) {
            return res.status(400).json({errors: [{msg: 'Product already existis'}]});
        }
        parsedPrice = parseFloat(price.replace(',','.'))
        const productFields = {
            name,
            price: parsedPrice,
            user: req.user.id
        }

        product = new Product(productFields)
        const p = await product.save()
        res.json(p);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server Error'}]});
    }
}

)

// @route   GET api/product
// @desc    Get all products
// @access  Private

router.get("/", auth, async (req, res) => {
    try {
        const products = await Product.find({user: req.user.id}).sort({name:1});
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
})

// @route   GET api/product/:id
// @desc    Get product by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({errors: [{ msg: 'Product not found'}]})
        }
        if(product.user.toString() !== req.user.id){
            return res.status(400).json({errors: [{ msg: 'Product belongs to other user'}]})
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({errors: [{ msg: 'Product not found'}]})
        }
        res.status(500).json({errors: [{msg: 'Server Error'}]});
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
            .isEmpty(),
        check('price', 'Price must be a number')
            .isNumeric({locale: 'pt-BR'}),
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const { name, price } = req.body
        var product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(400).json({errors: [{msg: 'Product does not exist'}]});
        }

        if(product.user.toString() !== req.user.id){
            return res.status(400).json({errors: [{ msg: 'Product belongs to other user'}]})
        }
        parsedPrice = parseFloat(price.replace(',','.'))
        var p = await Product.findByIdAndUpdate(req.params.id, { name, price: parsedPrice })

        res.json(p);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server Error'}]});
    }
}

)

// @route   DELETE api/product/:id
// @desc    Delete a product
// @access  Private

router.delete("/:id", auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({errors: [{ msg: 'Product not found'}]})
        }
        // Check product
        if(product.user.toString() !== req.user.id) {
            return res.status(401).json({errors: [{ msg: 'User not authorized' }]});
        }
        // Remove associated sale
        
        const sales = await Sale.find();
        sales.map(async (sale) => {
            // Iterate over each sale
            for (let index = 0; index < sale.products.length; index++){
                // Check if product is in sale
                if (sale.products[index].product.toString() === req.params.id){
                    // If only product in sale, delete it
                    if (sale.products.length === 1) {
                        await sale.remove()
                    // If not alone, remove it from sale
                    } else {
                        sale.products.splice(index, 1)
                        await sale.save()
                    }
                }
            }
        })

        await product.remove();

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{ msg: 'Server Error'}]});
    }
})

module.exports = router;