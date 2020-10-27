const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth');
const Client = require('../../models/Client')
const Sale = require('../../models/Sale');

// @route   POST api/client
// @desc    Create a client
// @access  Private

router.post("/", [
    auth,
    [
        check('name', 'Fill the client name.')
            .not()
            .isEmpty(),
        check('email', 'Enter a valid email')
            .isEmail(),
        
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    
    try {
        const { name } = req.body
        var client = await Client.findOne({name, user: req.user.id})
        if(client) {
            return res.status(400).json({errors: [{msg: 'Client already existis'}]});
        }
        const clientFields = {
            ...req.body,
            user: req.user.id
        }

        client = new Client(clientFields)
        const p = await client.save()
        res.json(p);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server Error'}]});
    }
}

)

// @route   GET api/client
// @desc    Get all clients
// @access  Private

router.get("/", auth, async (req, res) => {
    try {
        const clients = await Client.find({user: req.user.id}).sort({name:1});
        res.json(clients);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
})

// @route   GET api/client/:id
// @desc    Get client by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if(!client) {
            return res.status(404).json({errors: [{ msg: 'Client not found'}]})
        }
        if(client.user.toString() !== req.user.id){
            return res.status(400).json({errors: [{ msg: 'Client belongs to other user'}]})
        }
        res.json(client);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({errors: [{ msg: 'Client not found'}]})
        }
        res.status(500).json({errors: [{msg: 'Server Error'}]});
    }
})

// @route   POST api/client
// @desc    Create a client
// @access  Private

router.put("/:id", [
    auth,
    [
        check('name', 'Fill the client name.')
            .not()
            .isEmpty(),
        check('email', 'Enter a valid email')
            .isEmail(),
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    
    try {
        const clientUpdateFields = req.body
        var client = await Client.findById(req.params.id)
        if(!client) {
            return res.status(400).json({errors: [{msg: 'Client does not exist'}]});
        }

        if(client.user.toString() !== req.user.id){
            return res.status(400).json({errors: [{ msg: 'Client belongs to other user'}]})
        }

        await Client.findByIdAndUpdate(req.params.id, clientUpdateFields)

        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: 'Server Error'}]});
    }
}

)

// @route   DELETE api/client/:id
// @desc    Delete a client
// @access  Private

router.delete("/:id", auth, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if(!client) {
            return res.status(404).json({errors: [{ msg: 'Client not found'}]})
        }
        
        if(client.user.toString() !== req.user.id) {
            return res.status(401).json({errors: [{ msg: 'User not authorized' }]});
        }

        // Remove associated sale
        
        const sales = await Sale.find();
        var clientSales = sales.filter(sale => sale.client.toString() === req.params.id)
        clientSales.map(async (sale) => await sale.remove())
        await client.remove();

        res.json({ msg: 'Client removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{ msg: 'Server Error'}]});
    }
})

module.exports = router;