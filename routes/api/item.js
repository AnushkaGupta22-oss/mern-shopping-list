const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/items');

// Auth middleware
const auth = require('../../middleware/auth');


// @route   GET api/item
// @desc    Get only logged-in user's items
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const items = await Item.find({
            user: req.user.id
        }).sort({ date: -1 });

        res.json(items);

    } catch (err) {
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


// @route   POST api/item
// @desc    Create an item for logged-in user
// @access  Private
router.post('/', auth, async (req, res) => {
    try {

        const newItem = new Item({
            name: req.body.name,
            user: req.user.id
        });

        const item = await newItem.save();

        res.json(item);

    } catch (err) {
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


// @route   DELETE api/item/:id
// @desc    Delete only logged-in user's item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {

        const item = await Item.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!item) {
            return res.status(404).json({
                msg: 'Item not found or unauthorized'
            });
        }

        await Item.findByIdAndDelete(req.params.id);

        res.json({
            success: true
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
});


module.exports = router;