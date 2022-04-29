const ContenedorMongo = require('../../contenedores/mongoDB/ContenedorMogoDB.js')
const mongoose = require('mongoose')
const Carritos = require('../../contenedores/mongoDB/models/carritos.js')




class MongoCarritos extends ContenedorMongo {
  constructor() {
    super('Carritos')
  }

  listarAll() {
    super.query()
  }
  async listarProductos(id) {


    try {
    
      mongoose.connect("mongodb://localhost:27017/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    
        const carrito = await Carritos.find({id:id});

        const resultado = carrito[0].Productos



        return(resultado)


    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`)
    }
  }


  async actualizarProductos(id,productos) {


    try {
    
      mongoose.connect("mongodb://localhost:27017/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    
      const resultado = await Carritos.findOneAndUpdate({id:id},{
        "Productos":productos 
      });

    

        return(resultado)


    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`)
    }
  }





}

module.exports = MongoCarritos;