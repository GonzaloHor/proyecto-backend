const mongoose = require('mongoose')

const carritosCollection = "carritos";

const carritosSchema = new mongoose.Schema({
    id: {type: String, required: true, max: 100},
    Timestamp: {type: String, required: true, max: 100},
    Productos: {type: Array, required: true, max: 100},


});

const Carritos = mongoose.model(carritosCollection, carritosSchema);

module.exports = Carritos;