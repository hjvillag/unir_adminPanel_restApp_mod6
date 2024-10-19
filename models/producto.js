const mongoose = require('mongoose')
const productoRouter = require('../controllers/productos')

//denifir el esquema para el usuario
const productoSchema = new mongoose.Schema({
    nombre:String,
    precio:Number,
    categoria:Number
    
})

//configurar la respuesta del usuario en el esquema
productoSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

//registrar el modelo
const producto = mongoose.model('producto',productoSchema)

//exportar
module.exports = producto