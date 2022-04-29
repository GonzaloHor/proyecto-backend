const express = require('express');
const router = express.Router();
const fs = require('fs');
const FirebaseProductos = require('../daos/productos/firebaseProductos.js')
const FirebaseCarrito = require('../daos/carritos/firebaseCarrito.js')
const MongoProductos = require('../daos/productos/mongodbProductos.js')
const MongoCarritos = require('../daos/carritos/mongodbCarritos.js')




class CreateFile{
    constructor(nameFile){
        this.nameFile = nameFile;   
    };
    
    readFile(){
        const ruta = `./${this.nameFile}.txt`

        try {
            const datas = fs.readFileSync(ruta,'utf-8');
            const dataJson = JSON.parse(datas);


             return dataJson
 
        } catch (error){
            if(error.message == "Unexpected end of JSON input"){
                return []
            }
               
            return(`Hubo un error: ${error.message}`);
            
        }

    }

    writeFile(producto){
        const ruta = `./${this.nameFile}.txt`

        try {

        
            fs.writeFileSync(ruta,JSON.stringify(producto, null, '\t'));
       
 
        } catch (error){
            console.log(`Hubo un error: ${error}`);
        }

    }

    addProduct(producto){
        const ruta = `./${this.nameFile}.txt`

        try {
            const datas = fs.readFileSync(ruta,'utf-8');
            const todosLosProductos = JSON.parse(datas);

            producto.id = todosLosProductos[todosLosProductos.length-1].id + 1
    
            let dataTime = new Date();
            let hoy = new Date(dataTime)
                    
            let fecha = hoy.toLocaleDateString()
            let hora = hoy.toLocaleTimeString()
                
            let tiempoMensaje =  `${fecha} ${hora}`
        
            producto.Timestamp = tiempoMensaje;
            
            
        
            todosLosProductos.push(producto)
            fs.writeFileSync(ruta,JSON.stringify(todosLosProductos, null, '\t'));



            
            return(producto)      
            
        } catch (error) {
            return(`Hubo un error: ${error.message}`);
        }
    }

    modifyProduct(id,productoModificar){
        const ruta = `./${this.nameFile}.txt`

        try {
            const datas = fs.readFileSync(ruta,'utf-8');
            const todosLosProductos = JSON.parse(datas);


            let producto = todosLosProductos.find(e => e.id == id)
    

            if(!producto)res.send({error: 'producto no encontrado'})
        
            let index = todosLosProductos.indexOf(producto)
        
            let idProducto = todosLosProductos[index].id
        
            todosLosProductos[index] = productoModificar;
            todosLosProductos[index].id = idProducto
        
            fs.writeFileSync(ruta,JSON.stringify(todosLosProductos, null, '\t'));

        
            return(`Se modificó correctamente el siguiente producto con id: ${idProducto} `)     
            
        } catch (error) {
            return(`Hubo un error: ${error.message}`);

        }
    }
    

    deleteById(id){
        const ruta = `./${this.nameFile}.txt`

        try {
        const datas = fs.readFileSync(ruta,'utf-8');
        const todosLosProductos = JSON.parse(datas);

        let producto = todosLosProductos.find(e => e.id == id)
        if(!producto)res.send({error: 'producto no encontrado'})

        let nuevoObjeto = todosLosProductos.filter((e) => e.id !== producto.id)
        productos.writeFile(nuevoObjeto)


        return(`Se elimió correctamente el siguiente producto con id: ${id} `)        
            
        } catch (error) {
            return(`Hubo un error: ${error.message}`);

        }
    }

}

class CreateFileCompras{
    constructor(nameFile){
        this.nameFile = nameFile;   
    };
    
    readFile(){
        const ruta = `./${this.nameFile}.txt`

        try {
            const datas = fs.readFileSync(ruta,'utf-8');
            const dataJson = JSON.parse(datas);


             return dataJson
 
        } catch (error){
            if(error.message == "Unexpected end of JSON input"){
                return []
            }
               
            console.log(`Hubo un error: ${error.message}`);
            return
        }

    }

    writeFile(producto){
        const ruta = `./${this.nameFile}.txt`

        try {

        
            fs.writeFileSync(ruta,JSON.stringify(producto, null, '\t'));
       
 
        } catch (error){
            console.log(`Hubo un error: ${error}`);
        }

    }

    deleteById(id, productId){
        const ruta = `./${this.nameFile}.txt`

        try {
            const datas = fs.readFileSync(ruta,'utf-8');
            let registroCompras = JSON.parse(datas);

            let compra = registroCompras.find(e => e.id == id)

            if(compra == undefined) {compra = { error : 'Compra no encontrada' }; return(compra) }
        
            let index = registroCompras.indexOf(compra)
            let productosEnCompra = registroCompras[index].Productos
        
            let producto = productosEnCompra.find(e => e.id == productId)
            
            if(producto == undefined) { producto = { error : 'Producto no encontrado en el carrito' } ; return(producto)}
        
            let nuevoObjeto = productosEnCompra.filter((e) => e.id !== producto.id)
        
            registroCompras[index].Productos = nuevoObjeto
        
            fs.writeFileSync(ruta,JSON.stringify(registroCompras, null, '\t'));
        
        
            return (`Se elimió correctamente el siguiente producto con id: ${productId}`)




        } catch (error){
            return(`Hubo un error: ${error.message}`)
        }


    }

    addProduct(id, newProduct){
     const ruta = `./${this.nameFile}.txt`

    try {
        const datas = fs.readFileSync(ruta,'utf-8');
        let registroCompras = JSON.parse(datas);
        let compra = registroCompras.find(e => e.id == id)

        if(!compra)return({error: 'Compra no encontrada'})
        
        let index = registroCompras.indexOf(compra)

        registroCompras[index].Productos.push(newProduct);

        fs.writeFileSync(ruta,JSON.stringify(registroCompras, null, '\t'));


        return(`Se agrego correctamente el producto a tu carrito con id: ${id} `)          



    } catch (error){     
        
        return(`Hubo un error: ${error.message}`)

    }

    }

    deleteCarritoByid(id){
        const ruta = `./${this.nameFile}.txt`

        try {
            const datas = fs.readFileSync(ruta,'utf-8');
            let registroCompras = JSON.parse(datas);

            let compra = registroCompras.find(e => e.id == id)
            if(!compra)return({error: 'Compra no encontrada'})


            let nuevoObjeto = registroCompras.filter((e) => e.id !== compra.id)
            fs.writeFileSync(ruta,JSON.stringify(nuevoObjeto, null, '\t'));


            return (`Se elimió correctamente compra con id: ${id}`)
      
        } catch (error) {
            return(`Hubo un error: ${error.message}`)
        }
    }
    
    addCarrito(newCarrito){
        const ruta = `./${this.nameFile}.txt`

        try {
            const datas = fs.readFileSync(ruta,'utf-8');
            let registroCompras = JSON.parse(datas);

            newCarrito.id = registroCompras[registroCompras.length-1].id + 1;
    
            let dataTime = new Date();
            let hoy = new Date(dataTime)
                    
            let fecha = hoy.toLocaleDateString()
            let hora = hoy.toLocaleTimeString()
                
            let tiempoMensaje =  `${fecha} ${hora}`
        
            newCarrito.Timestamp = tiempoMensaje;
        
        
            registroCompras.push(newCarrito)
        
            fs.writeFileSync(ruta,JSON.stringify(registroCompras, null, '\t'));
        
            
            return(newCarrito)      
            
        } catch (error) {
            
        }

    }

}



let productos = new CreateFile('Productos');
let Compras = new CreateFileCompras('Registro Compras');





let administrador = true;







if(administrador === true ){
    
router.get('/productos/:id?', (req, res)=>{
    const id = req.params.id
    let todosLosProductos = productos.readFile()


     if(id != undefined){
    
        let producto = todosLosProductos.find(e => e.id == id)

        if(!producto)res.send({error: 'producto no encontrado'})  
        
        

        
        const productoFirebase = new FirebaseProductos();
        const respuesta = productoFirebase.listar(id);


        const productoMongoDB = new MongoProductos();
        const respuestaMongo = productoMongoDB.listar(id);


    
        res.send(producto)          
    } else {
        res.send(todosLosProductos)
    }                
});

router.post('/productos/', (req, res)=>{

    const {Name, Description, Thumbnail, Precio, Stock} = req.body

    if(!Name || !Description || !Thumbnail ||  !Precio || !Stock) return res.send('Ingresa correctamente todos los campos (Name, Description, Thumbnail, Precio, Stock)')

    const producto = {Name, Description, Thumbnail, Precio, Stock}

    
    


    let respuesta = productos.addProduct(producto)

    const productoFirebase = new FirebaseProductos();
            productoFirebase.guardar(producto)

    const productoMongoDB = new MongoProductos();
    productoMongoDB.guardar(producto)


    
    res.send(respuesta)          

});

router.put('/productos/:id?', (req, res)=>{

    const productoModificar = req.body
    const id = req.params.id

    let respuesta = productos.modifyProduct(id,productoModificar)

    const productoFirebase = new FirebaseProductos();
    const resFirebase = productoFirebase.actualizar(productoModificar,id);


    const productoMongoDB = new MongoProductos();
    const respuestaMongo = productoMongoDB.actualizar(productoModificar,id);


    res.send(respuesta)          

    
});

router.delete('/productos/:id?', (req, res)=>{

    const id = req.params.id
    
    let respuesta = productos.deleteById(id)

    const productoFirebase = new FirebaseProductos();
    const resFirebase = productoFirebase.borrar(id);

    const productoMongoDB = new MongoProductos();
    const respuestaMongo = productoMongoDB.borrar(id);



    

    res.send(respuesta)          

    
});


    
router.post('/carrito/', (req, res)=>{
   
    const newCarrito = req.body

    
    let respuesta = Compras.addCarrito(newCarrito)

    const carritoFirebase = new FirebaseCarrito();
    carritoFirebase.guardar(respuesta)

    
    const carritoMongoDB = new MongoCarritos();
    carritoMongoDB.guardar(respuesta)



    
        
    res.send(respuesta)                   
     
});

router.delete('/carrito/:id', (req, res)=>{

    const id = req.params.id

    let respuesta = Compras.deleteCarritoByid(id)

    

    const carritoFirebase = new FirebaseCarrito();
    carritoFirebase.borrar(id)


    const carritoMongoDB = new MongoCarritos();
    const resMongo = carritoMongoDB.borrar(id)



    res.send(respuesta)          

    
});

router.get('/carrito/:id/productos', (req, res) =>{
    let registroCompras = Compras.readFile();
    const id = req.params.id;

    let compra = registroCompras.find(e => e.id == id)

    if(!compra)res.send({error: 'Compra no encontrada'})

    const carritoFirebase = new FirebaseCarrito();


     function espera(id){
         carritoFirebase.listar(id)
    }
    const respuesta = espera();


    const carritoMongoDB = new MongoCarritos();
    const resMongoDB = carritoMongoDB.listarProductos(id)




    let index = registroCompras.indexOf(compra)




    res.send(registroCompras[index].Productos)
})

router.post('/carrito/:id/productos', (req, res) =>{
    const id = req.params.id;

    const {Name, Description, Thumbnail, Precio, Stock} = req.body

    if(!Name || !Description || !Thumbnail ||  !Precio || !Stock) return res.send('Ingresa correctamente todos los campos (Name, Description, Thumbnail, Precio, Stock)')

    const newProduct = {Name, Description, Thumbnail, Precio, Stock}

    const carritoFirebase = new FirebaseCarrito();

    let respuesta = Compras.addProduct(id,newProduct)

    let registroCompras = Compras.readFile();

    let compra = registroCompras.find(e => e.id == id)

    let soloProductos = compra.Productos

    carritoFirebase.modificarProductos(id,soloProductos)



    const carritoMongoDB = new MongoCarritos();
    const respuestaMongo = carritoMongoDB.actualizarProductos(id, soloProductos);


    

    res.send(respuesta);      

});

router.delete('/carrito/:id/productos/:id_prod', (req, res)=>{
    const id = req.params.id;
    const productId = req.params.id_prod

    let respuesta = Compras.deleteById(id, productId)

    const carritoFirebase = new FirebaseCarrito();

    let registroCompras = Compras.readFile();

    let compra = registroCompras.find(e => e.id == id)

    let soloProductos = compra.Productos

    carritoFirebase.modificarProductos(id,soloProductos)

    const carritoMongoDB = new MongoCarritos();
    const respuestaMongo = carritoMongoDB.actualizarProductos(id, soloProductos);





    res.send(respuesta) ;
});



} else{

    router.get('/productos/:id?', (req, res)=>{
        const id = req.params.id
        let todosLosProductos = productos.readFile()
    
    
         if(id != undefined){
        
            let producto = todosLosProductos.find(e => e.id == id)
    
            if(!producto)res.send({error: 'producto no encontrado'})   
            
            const productoFirebase = new FirebaseProductos();
            const respuesta = productoFirebase.listar(id);
    
        
            res.send(producto)          
        } else {
            res.send(todosLosProductos)
        }                
    });
}



module.exports = router;



