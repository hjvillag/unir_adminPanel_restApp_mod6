const mongoose = require('mongoose')
const ordenRouter = require('../controllers/ordenes')

const pedidoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    cantidad: Number,
    categoria: Number,
    id: String
})

const clienteSchema = new mongoose.Schema({
    mesa: String,
    hora: String,
    pedido: [pedidoSchema]
})

const ordenSchema = new mongoose.Schema({
    cliente: clienteSchema,
    subtotal: Number,
    propina: Number,
    total: Number,
    user: String
})

const orden = mongoose.model('orden', ordenSchema)

ordenSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = orden