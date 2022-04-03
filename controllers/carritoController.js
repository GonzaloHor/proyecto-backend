const express = require('express');
const router = express.Router();
const fs = require('fs')

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
                let mensaje = "No hay contenido"
                return mensaje
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
    

}


let Compras = new CreateFile('Registro Compras');
let administrador = true;


if(administrador === true ){

    
router.post('/', (req, res)=>{
   
    let registroCompras = Compras.readFile();
    const newCompra = req.body

    if (registroCompras == 'No hay contenido') {
  
    newCompra.id = 1

    let dataTime = new Date();
    let hoy = new Date(dataTime)
            
    let fecha = hoy.toLocaleDateString()
    let hora = hoy.toLocaleTimeString()
        
    let tiempoMensaje =  `${fecha} ${hora}`

    newCompra.Timestamp = tiempoMensaje;

    Compras.writeFile([newCompra])

    
    res.send(`Se genero correctamente tu compra con su id : ${newCompra.id}`)           


    } else {
       
        newCompra.id = registroCompras.length + 1
    
        let dataTime = new Date();
        let hoy = new Date(dataTime)
                
        let fecha = hoy.toLocaleDateString()
        let hora = hoy.toLocaleTimeString()
            
        let tiempoMensaje =  `${fecha} ${hora}`
    
        newCompra.Timestamp = tiempoMensaje;
    
    
        registroCompras.push(newCompra)
    
        Compras.writeFile(registroCompras)
    
        
        res.send(`Se genero correctamente tu compra con su id : ${newCompra.id}`)                   
    
    };
                  
});

router.delete('/:id', (req, res)=>{

    let registroCompras = Compras.readFile();
    const id = req.params.id

    let compraBorrar = registroCompras.find(e => e.id == id)
    if(compraBorrar == undefined) {

        compraBorrar = { error : 'Compra no encontrada' } 
        res.send(compraBorrar) 
    }

    let nuevoObjeto = registroCompras.filter((e) => e.id !== compra.id)
    Compras.writeFile(nuevoObjeto)


    res.send(`Se elimió correctamente tu compra con id: ${id} `)          

    
});

router.get('/:id/productos', (req, res) =>{
    let registroCompras = Compras.readFile();
    const id = req.params.id;

    let compra = registroCompras.find(e => e.id == id)
    if(compra == undefined) {

        compra = { error : 'Compra no encontrada' } 
        res.send(compra) 
    }

    let index = registroCompras.indexOf(compra)

    res.send(registroCompras[index].Productos)
})

router.post('/:id/productos', (req, res) =>{
    let registroCompras = Compras.readFile();
    const id = req.params.id;
    const newProduct = req.body;


    let compra = registroCompras.find(e => e.id == id)
    if(compra == undefined) {

        compra = { error : 'Compra no encontrada' } 
        res.send(compra) 
    }

    let index = registroCompras.indexOf(compra)

    registroCompras[index].Productos.push(newProduct);

    Compras.writeFile(registroCompras)

    res.send(`Se agrego correctamente el producto a tu carrito con id: ${id} `)          






});

router.delete('/:id/productos/:id_prod', (req, res)=>{
    let registroCompras = Compras.readFile();
    const id = req.params.id;
    const productId = req.params.id_prod

    let compra = registroCompras.find(e => e.id == id)
    if(compra == undefined) {

        compra = { error : 'Compra no encontrada' } 
        res.send(compra) 
    }

    let index = registroCompras.indexOf(compra)
    let productosEnCompra = registroCompras[index].Productos

    let producto = productosEnCompra.find(e => e.id == productId)
    if(producto == undefined) {

        producto = { error : 'Producto no encontrado en el carrito' } 
        res.send(producto) 
    }

    let nuevoObjeto = productosEnCompra.filter((e) => e.id !== producto.id)

    registroCompras[index].Productos = nuevoObjeto

    Compras.writeFile(registroCompras)


    res.send(`Se elimió correctamente el siguiente producto con id: ${productId} `)  

});

} else{
    
}




module.exports = router;