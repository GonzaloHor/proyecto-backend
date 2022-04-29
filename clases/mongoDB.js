const mongoose = require('mongoose')
const Producto = require('./models/producto.js')





class Contenedor { 
    constructor(elemento) {
        this.elemento = elemento;
    }


   agregar(elemento) {

        try {
            mongoose.connect("mongodb://localhost:27017/ecommerce",{
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
            console.log('Conectado a la base')


            const productoNuevo = new Producto(this.elemento);
            productoNuevo.save();
            console.log("Producto Agregado");

        } catch (error) {
            console.log('Hubo un error al agregar el producto ')
        }
    
    }

    eliminar(elemento) {
        // eliminar(elemento);
    }

    obtener(elemento) {
        // obtener(elemento);
    }
}

 class Productos extends Contenedor { 
    constructor(elemento) {
        super(elemento); 
    }

    editar(elemento) {

    }
 }

 module.exports = Contenedor



