const mongoose = require('mongoose')
const Productos = require('./models/productos.js')
const Carritos = require('./models/carritos.js')




class ContenedorMongo {
  constructor(collection) {
    this.collection = collection
  }

  



  async listar(id) {

      try {
    
        mongoose.connect("mongodb://localhost:27017/ecommerce", {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      

        if (this.collection === "Productos"){


          const producto = await Productos.find({id:id});

          return(producto)

        } else if(this.collection === "Carritos"){


          const carrito = await Carritos.find({id:id});

          return(carrito)

        }

      } catch (error) {
        throw new Error(`Error al listar por id: ${error}`)
      }
  }

  async listarAll() {
    try {

    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`)
    }
  }

  async guardar(nuevoElem) {

      try {
        mongoose.connect("mongodb://localhost:27017/ecommerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });


        
        if (this.collection === "Productos"){

          const productoNuevo = new Productos(nuevoElem);
        await productoNuevo.save();

        } else if(this.collection === "Carritos"){

          const carritoNuevo = new Carritos(nuevoElem);
          await carritoNuevo.save();

        }

        



    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async actualizar(objeto, id) {
    mongoose.connect("mongodb://localhost:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      if (this.collection === "Productos"){


          await Productos.findOneAndUpdate({id:id},{
            "Name": objeto.Name,
            "Description": objeto.Description,
            "Thumbnail": objeto.Thumbnail,
            "Precio": objeto.Precio,
            "Stock": objeto.Stock,
          });

        


      } else if(this.collection === "Carritos"){



      }

    
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }

  }

  async borrar(id) {

 
    try {

      mongoose.connect("mongodb://localhost:27017/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });



     
      if (this.collection === "Productos"){

        const res = await Productos.deleteOne({id:id});

        return(res)

      } else if(this.collection === "Carritos"){

        const res = await Carritos.deleteOne({id:id});

        return(res)
      }

    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }


  }
  



}

module.exports = ContenedorMongo