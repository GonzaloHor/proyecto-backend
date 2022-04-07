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

    
            
            return(`Se agregó correctamente el siguiente producto: ${producto.Name}`)      
            
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


let productos = new CreateFile('Productos');

let administrador = true;


if(administrador === true ){
    
router.get('/:id?', (req, res)=>{
    const id = req.params.id
    let todosLosProductos = productos.readFile()


    if(id != undefined){
    
        let producto = todosLosProductos.find(e => e.id == id)

        if(!producto)res.send({error: 'producto no encontrado'})                        
        res.send(producto)          
    } else {
        res.send(todosLosProductos)
    }                
});

router.post('/', (req, res)=>{

    const {Name, Description, Thumbnail, Precio, Stock} = req.body

    if(!Name || !Description || !Thumbnail ||  !Precio || !Stock) return res.send('Ingresa correctamente todos los campos (Name, Description, Thumbnail, Precio, Stock)')

    const producto = {Name, Description, Thumbnail, Precio, Stock}

    let respuesta = productos.addProduct(producto)
    
        
    res.send(respuesta)          

});

router.put('/:id?', (req, res)=>{

    const productoModificar = req.body
    const id = req.params.id

    let respuesta = productos.modifyProduct(id,productoModificar)

    res.send(respuesta)          

    
});

router.delete('/:id?', (req, res)=>{

    const id = req.params.id
    
    let respuesta = productos.deleteById(id)

    res.send(respuesta)          

    
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



