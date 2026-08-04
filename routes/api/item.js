const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/items');

// @route GET request to API/item
// @desc Get all items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

// @route POST to API/item
// @desc Create an item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => res.json(item));
});

// @route DELETE to API/item/:id
// @desc Delete an item
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(404).json({ success: false });
    }
});
module.exports = router;