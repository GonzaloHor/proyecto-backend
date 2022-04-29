const ContenedorFirebase = require('../../contenedores/firebase/ContenedorFirebase.js')

class FirebaseProductos extends ContenedorFirebase {
  constructor() {
    super('productos')
  }

  listarAll() {
    super.query()
  }
}

module.exports = FirebaseProductos;