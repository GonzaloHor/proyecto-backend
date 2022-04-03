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


let productos = new CreateFile('Productos');

let administrador = false;


if(administrador === true ){
    
router.get('/:id?', (req, res)=>{
    const id = req.params.id
    let todosLosProductos = productos.readFile()


    if(id != undefined){
    
        let producto = todosLosProductos.find(e => e.id == id)


        if(producto == undefined) {producto = { error : 'producto no encontrado' }}
                        
        res.send(producto)          
    } else {
        res.send(todosLosProductos)
    }                
});

router.post('/:id?', (req, res)=>{

    let todosLosProductos = productos.readFile();
    const producto = req.body

    if (todosLosProductos == 'No hay contenido') {
  
    producto.id = 1

    let dataTime = new Date();
    let hoy = new Date(dataTime)
            
    let fecha = hoy.toLocaleDateString()
    let hora = hoy.toLocaleTimeString()
        
    let tiempoMensaje =  `${fecha} ${hora}`

    producto.Timestamp = tiempoMensaje;

    productos.writeFile([producto])

    
    res.send(`Se agregó correctamente el siguiente producto: ${producto.Name}`)           


    } else {
       
        producto.id = todosLosProductos.length + 1
    
        let dataTime = new Date();
        let hoy = new Date(dataTime)
                
        let fecha = hoy.toLocaleDateString()
        let hora = hoy.toLocaleTimeString()
            
        let tiempoMensaje =  `${fecha} ${hora}`
    
        producto.Timestamp = tiempoMensaje;
    
    
        todosLosProductos.push(producto)
    
        productos.writeFile(todosLosProductos)
    
        
        res.send(`Se agregó correctamente el siguiente producto: ${producto.Name}`)          
    
    };
    
});

router.put('/:id?', (req, res)=>{

    let todosLosProductos = productos.readFile();
    const productoModificar = req.body
        const id = req.params.id


    let producto = todosLosProductos.find(e => e.id == id)
    

    if(producto == undefined) {producto = { error : 'producto no encontrado' }, res.send(producto)}

    let index = todosLosProductos.indexOf(producto)

    let idProducto = todosLosProductos[index].id

    todosLosProductos[index] = productoModificar;
    todosLosProductos[index].id = idProducto

    productos.writeFile(todosLosProductos)

    res.send(`Se modificó correctamente el siguiente producto con id: ${idProducto} `)          

    
});

router.delete('/:id?', (req, res)=>{

    let todosLosProductos = productos.readFile();
    const id = req.params.id

    let producto = todosLosProductos.find(e => e.id == id)
    if(producto == undefined) {

        producto = { error : 'producto no encontrado' } 
        res.send(producto) 
    }

    let nuevoObjeto = todosLosProductos.filter((e) => e.id !== producto.id)
    productos.writeFile(nuevoObjeto)


    res.send(`Se elimió correctamente el siguiente producto con id: ${id} `)          

    
});


} else{

    router.get('/:id?', (req, res)=>{
        const id = req.params.id
        let todosLosProductos = productos.readFile()
    
    
        if(id != undefined){
        
            let producto = todosLosProductos.find(e => e.id == id)
    
    
            if(producto == undefined) {producto = { error : 'producto no encontrado' }}
                            
            res.send(producto)          
        } else {
            res.send(todosLosProductos)
        }                
    });
}



module.exports = router;



