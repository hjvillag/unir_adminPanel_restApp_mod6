//1 definir el router
//router: POST, GET, DELETE, UPDATE

const productoRouter = require('express').Router()

//conectar al modelo
const producto = require('../models/producto')

//2 registro del nombre que el usuario ingreso en el formulario
productoRouter.post('/',(request,response)=>{
    //cuando ingrese a este metodo es porque lo estoy llamando desde el js del front relacionado al formulario donde quiero realizar el registro
    const {nombre,precio,categoria} = request.body
    console.log('extraccion ',nombre,precio,categoria) // este console.log va a aparecer en la terminal

    //validaciones a nivel de backend
    if(!nombre && !precio && !categoria){
        //al realizar esta validacion retorno al frontend que hay un error
        return response
        .status(400)
        .json({error:'Todos los campos son obligatorios'})
    }else{
        //caso en que esta correcto el dato a registrar, luego nos toca enviarlos a la BD
        console.log('recibido en backend ',nombre,precio,categoria)
        //enviar los datos a la BD
        let product = new producto()
        product.nombre = nombre
        product.precio = precio
        product.categoria = categoria

        async function guardarProducto() {
            await product.save() // guardo en la bd
            //console.log('hola')
            const productoConsulta = await producto.find()
            console.log(productoConsulta)

            guardarProducto().catch(console.error)
        }
        guardarProducto()
        
        return response
        .status(200)
        .json({mensaje:'Se ha creado el producto'})
    }
})

productoRouter.get('/', async (request, response)=>{
    try{
        const productos = await producto.find()
        console.log(productos)
        return response.status(200).json(productos)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener los productos'})
    }
})

productoRouter.get('/:id', async (request, response) => {
    try{
        const productoId = await producto.findById(request.params.id);
        response.status(200).json(productoId);
    }catch (error) {
        console.error(error);
        response.status(400).json({ message: 'Error al obtener el producto' });
    }
})

productoRouter.put('/:id', async (request, response) => {
    try {
        const productoId = await producto.findById(request.params.id)
        const {nombre,precio,categoria} = request.body

        if (!nombre && !precio && !categoria) {
            return response.status(400).json({ message:'Todos los campos son requeridos'})
        }
  
        const productoActualizado = await producto.findByIdAndUpdate(productoId,{nombre,precio,categoria})
        response.status(200).json(productoActualizado)
    }catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Error al actualizar el producto' })
    }
})

productoRouter.delete('/:id', async (request, response) => {
    try{
        const productoId = await producto.findByIdAndDelete(request.params.id);
        response.status(200).json({ message: 'Producto eliminada exitosamente' });
    }catch (error) {
        console.error(error);
        response.status(400).json({ message: 'Error al eliminar el producto' });
    }
})

module.exports = productoRouter