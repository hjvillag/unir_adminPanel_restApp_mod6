require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRouter = require('./controllers/users')
const productoRouter = require('./controllers/productos')
const ordenRouter = require('./controllers/ordenes')
//const cors = require('cors')
//const cookieParser = require('cookie-parser')
//const morgan = require('morgan')

//conexion BD
async function conectarBD() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Te has conectado a MongoDB");
    }catch(error){
        console.log("No se ha podido conectar a MongoBD");
    }    
}
conectarBD()

//rutas frontend
app.use('/',express.static(path.resolve('views','home')))
app.use('/admin-panel',express.static(path.resolve('views','adminPanel')))
app.use('/restaurant-app',express.static(path.resolve('views','restaurant_app')))
app.use('/components',express.static(path.resolve('views','components')))
app.use('/registro',express.static(path.resolve('views','registro')))
app.use('/login',express.static(path.resolve('views','login')))
app.use('/images',express.static(path.resolve('img')))

//importante
app.use(express.json())
//app.use(cors())
//app.use(cookieParser())
//app.use(morgan('tiny'))

//rutas de backend
app.use('/api/users',userRouter)
app.use('/api/productos',productoRouter)
app.use('/api/ordenes',ordenRouter)

module.exports = app