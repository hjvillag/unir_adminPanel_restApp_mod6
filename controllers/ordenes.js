const ordenRouter = require('express').Router()
const orden = require('../models/orden')

ordenRouter.post('/',(request,response)=>{

    const {cliente,subtotal,propina,total,user} = request.body

    let order = new orden()
    order.cliente = cliente
    order.subtotal = subtotal
    order.propina = propina
    order.total = total
    order.user = user

    async function guardarOrden() {
        await order.save() // guardo en la bd
    
        const ordenConsulta = await orden.find()
        console.log(ordenConsulta)
    
        guardarOrden().catch(console.error)
    }
    guardarOrden()
})

ordenRouter.get('/', async (request, response)=>{
    try{
        const ordenes = await orden.find()
        console.log(ordenes)
        return response.status(200).json(ordenes)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener las ordenes'})
    }
})

module.exports = ordenRouter