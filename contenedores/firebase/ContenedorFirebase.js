
const admin = require('firebase-admin');
const serviceaccount = require('./proyecto-back-b5041-firebase-adminsdk-86wwx-32f9479047.json')


admin.initializeApp({
  credential: admin.credential.cert(serviceaccount),
})


class ContenedorFirebase {
  constructor(collection) {
    this.collection = collection
  }



  async listar(id) {
    try {

    console.log(this.collection)

    let db = admin.firestore();

      const doc = await db.collection(this.collection).doc(id).get()
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`)
      } else {
        const data = doc.data()

        return data
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`)
    }
  }

  async listarAll() {
    try {
        let db = admin.firestore();

      const result = []
      const data = (async ()=>{ 
          await firebase.firestore().collection(this.collection).get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
            result.push(doc.data());
          });
        });
        return result;
    })();

      return data
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`)
    }
  }

  async guardar(nuevoElem) {
    let db = admin.firestore();
    try {
        let id =  nuevoElem.id
        id = String(id)
      const res = await db.collection(this.collection).doc(id).set(nuevoElem);

      return { ...nuevoElem, id: nuevoElem.id }

    console.log(this.db)



    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async actualizar(objeto, id) {

    try {
      
  

        let db = admin.firestore();

        // Create a document reference
        const docRef = db.collection(this.collection).doc(id);

        // Update the timestamp field with the value from the server
        const res = await docRef.update(
            {
            "Name": objeto.Name,
            "Description": objeto.Description,
            "Thumbnail": objeto.Thumbnail,
            "Precio": objeto.Precio,
            "Stock": objeto.Stock,
            }
        );

        console.log(res)

        return res
      } catch (error) {
        throw new Error(`Error al guardar: ${error}`)

      }
    }

  async borrar(id) {

    let db = admin.firestore();


    const res = await db.collection(this.collection).doc(id).delete();

    return res

  }
  



}

module.exports = ContenedorFirebase