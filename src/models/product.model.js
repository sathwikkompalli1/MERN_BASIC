const mongodb = require('mongodb');
const { getDB } = require('../config/db');

function col() {
    return getDB().collection('products');
}

async function addProduct(data) {
    const now = new Date();
    data.createdAt = now;
    data.updatedAt = now;
    const result = await col().insertOne(data);
    return col().findOne({ _id: result.insertedId });
}

async function fetchAll() {
    return col().find({}).toArray();
}

async function fetchOne(id) {
    return col().findOne({ _id: new mongodb.ObjectId(id) });
}

async function modifyProduct(id, changes) {
    changes.updatedAt = new Date();
    await col().updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: changes }
    );
    return col().findOne({ _id: new mongodb.ObjectId(id) });
}

async function removeProduct(id) {
    return col().deleteOne({ _id: new mongodb.ObjectId(id) });
}

module.exports = { addProduct, fetchAll, fetchOne, modifyProduct, removeProduct };

