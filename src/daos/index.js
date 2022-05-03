const FirebaseCarrito = require('./carritos/firebaseCarrito.js')
const MongoCarritos = require('./carritos/mongodbCarritos.js')
const FirebaseProductos = require('./productos/firebaseProductos.js')
const MongoProductos = require('./productos/mongodbProductos.JS')



const DATABASES = {
    firebase: {
        FirebaseCarrito: new FirebaseCarrito(),
        FirebaseProductos: new FirebaseProductos()
    },
    mongo: {
        MongoCarritos: new MongoCarritos(),
        MongoProductos: new MongoProductos()
    }
}




const {carritoApi, productosApi} = DATABASES

module.exports = {carritoApi, productosApi}