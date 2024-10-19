//1 conectar a mongodb y crear la dependencia
const mongoose = require('mongoose')
const userRouter = require('../controllers/users')

//2 definir el schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    tipo:String,
    verified:{
        type:Boolean,
        default:false
    }
})

//3 configurar la respuesta del usuario en el schema
userSchema.set('toJSON',{
    //document es el schema
    //returnObject es lo que estoy solicitando
    transform: (document,returnObject)=>{
        //estamos creando una nueva propiedad que se llame id
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
        delete returnObject.password
    }
})

//4 dar un nombre, registrar el modelo de datos
const User = mongoose.model('User',userSchema)

module.exports = User