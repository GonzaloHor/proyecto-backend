const ContenedorMongo = require('../../contenedores/mongoDB/ContenedorMogoDB.js')

class MongoProductos extends ContenedorMongo {
  constructor() {
    super('Productos')
  }

  listarAll() {
    super.query()
  }
}

module.exports = MongoProductos;