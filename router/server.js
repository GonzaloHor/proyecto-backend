const express = require('express')
const { Router } = express
const app = express()
const router = Router()
const fs = require('fs')
const productosController = require('../controllers/productosController');
const carritoController = require('../controllers/carritoController')



app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use('/', express.static(__dirname + '/public/index.html'));


app.listen(() => {
    try {
        console.log(`Servidor funcionando`)

    } catch (error){
        console.log(`Hubo un error: ${error}`);
    }
})



app.use('/api/productos', productosController)
app.use('/api/carrito', carritoController)

app.use('*', (req,res) => res.send({ 
    "error" : -2, 
    "ruta": req.baseUrl,
    "método": req.method,
    "descripcion": 'no implementada'
    }
    ))



app.listen(8080)
 