const mongoose = require('mongoose')

const productossCollection = "productos";

const productosSchema = new mongoose.Schema({
    Name: {type: String, required: true, max: 100},
    Description: {type: String, required: true, max: 2},
    Thumbnail: {type: String, required: true, max: 100},
    Precio: {type: String, required: true, max: 100},
    Stock: {type: String, required: true, max: 100},
    Timestamp: {type: String, required: true, max: 100},
});

let  Producto = mongoose.model(productossCollection, productosSchema)

module.exports = Producto;

