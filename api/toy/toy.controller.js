const toyService = require('./toy.service.js');
const logger = require('../../services/logger.service');

// GET LIST
async function getToys(req, res) {
    try {
        let { filterBy } = req.query;
        if (filterBy) filterBy = JSON.parse(filterBy);
        const toys = await toyService.query(filterBy);
        res.json(toys);
    } catch (err) {
        logger.error('Failed to get toys', err);
        res.status(500).send({ err: 'Failed to get toys' });
    }
}

// POST
async function addToy(req, res) {
    try {
        const toy = req.body;

        const addedToy = await toyService.add(toy);
        res.json(addedToy);
    } catch (err) {
        logger.error('Failed to add toy', err);
        res.status(500).send({ err: 'Failed to add toy' });
    }
}

// PUT
async function updateToy(req, res) {
    try {
        const toy = req.body;
        const updatedToy = await toyService.update(toy);
        res.json(updatedToy);
    } catch (err) {
        logger.error('Failed to update toy', err);
        res.status(500).send({ err: 'Failed to update toy' });

    }
}

// DELETE
async function removeToy(req, res) {
    try {
        const toyId = req.params.id;
        await toyService.remove(toyId);
        res.send({ msg: 'Delete Successfully' });
    } catch (err) {
        logger.error('Failed to remove toy', err);
        res.status(500).send({ err: 'Failed to remove toy' });
    }
}

module.exports = {
    getToys,
    addToy,
    updateToy,
    removeToy,
}
