const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

async function query(filterBy) {
    try {
        let criteria = {};
        if (filterBy) criteria = _buildCriteria(filterBy);
        const collection = await dbService.getCollection("toy");
        const toys = await collection.find(criteria).toArray() || [];
        return toys;
    } catch (err) {
        logger.error("cannot find toys", err);
        throw err;
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection("toy");
        await collection.deleteOne({ "_id": ObjectId(toyId) });
    } catch (err) {
        logger.error(`cannot remove toy ${toy._id}`, err);
        throw err;
    }
}

async function add(toy) {
    try {
        toy.createdAt = Date.now();
        const collection = await dbService.getCollection("toy");
        await collection.insertOne(toy);
    } catch (err) {
        logger.error("cannot add toy", err);
        throw err;
    }
}

async function update(toy) {
    try {
        const collection = await dbService.getCollection("toy");
        await collection.updateOne({
            "_id": ObjectId(toy._id)
        }, {
            $set: { ...toy }
        })
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const { inStock, labels, txt } = filterBy;
    let criteria = {};
    if (txt) criteria.name = { $regex: txt, $options: 'i' };
    if (inStock && inStock !== "all") criteria.inStock = true;
    else if (!inStock) criteria.inStock = false;
    if (labels?.length) criteria.labels = { $all: labels };
    return criteria;
}

module.exports = {
    remove,
    query,
    add,
    update,
}
