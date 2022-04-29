const ContenedorFirebase = require('../../contenedores/firebase/ContenedorFirebase.js')

const admin = require('firebase-admin');




class FirebaseCarrito extends ContenedorFirebase {
  constructor() {
    super('carritos')
  }

  listarAll() {
    super.query()
  }




  
  async modificarProductos(id,productos) {

    let db = admin.firestore();

    const docRef = db.collection(this.collection).doc(id);

    const res = await docRef.update(
        {
          'Productos': []
        }
    )

    
    return res

  }
}

module.exports = FirebaseCarrito;