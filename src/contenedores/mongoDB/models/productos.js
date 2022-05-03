const mongoose = require('mongoose')

const productosCollection = "productos";

const productosSchema = new mongoose.Schema({
    Name: {type: String, required: true, max: 100},
    Description: {type: String, required: true, max: 100},
    Thumbnail: {type: String, required: true, max: 100},
    Precio: {type: String, required: true, max: 100},
    Stock: {type: String, required: true, max: 100},
    id: {type: String, required: true, max: 100},
    Timestamp: {type: String, required: true, max: 100},
});

const Productos = mongoose.model(productosCollection, productosSchema);

module.exports = Productos;