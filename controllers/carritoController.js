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
        
            
            return(`Se genero correctamente tu compra con su id : ${newCarrito.id}`)      
            
        } catch (error) {
            
        }

    }

}


let Compras = new CreateFile('Registro Compras');
let administrador = true;


if(administrador === true ){

    
router.post('/', (req, res)=>{
   
    const newCarrito = req.body

    
    let respuesta = Compras.addCarrito(newCarrito)
    
        
    res.send(respuesta)                   
     
});

router.delete('/:id', (req, res)=>{

    const id = req.params.id

    let respuesta = Compras.deleteCarritoByid(id)

    res.send(respuesta)          

    
});

router.get('/:id/productos', (req, res) =>{
    let registroCompras = Compras.readFile();
    const id = req.params.id;

    let compra = registroCompras.find(e => e.id == id)

    if(!compra)res.send({error: 'Compra no encontrada'})


    let index = registroCompras.indexOf(compra)

    res.send(registroCompras[index].Productos)
})

router.post('/:id/productos', (req, res) =>{
    const id = req.params.id;

    const {Name, Description, Thumbnail, Precio, Stock} = req.body

    if(!Name || !Description || !Thumbnail ||  !Precio || !Stock) return res.send('Ingresa correctamente todos los campos (Name, Description, Thumbnail, Precio, Stock)')

    const newProduct = {Name, Description, Thumbnail, Precio, Stock}


    let respuesta = Compras.addProduct(id,newProduct)

    res.send(respuesta);      

});

router.delete('/:id/productos/:id_prod', (req, res)=>{
    const id = req.params.id;
    const productId = req.params.id_prod


   let respuesta = Compras.deleteById(id, productId)
    res.send(respuesta) ;
});

} else{
    
}




module.exports = router;