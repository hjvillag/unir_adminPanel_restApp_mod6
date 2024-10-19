//1 hacer el router
//router: registrar POST, GET, DELETE
const userRouter = require('express').Router()
const User = require('../models/user')

//registrar la informacion que el usuario envia a traves del formulario
userRouter.post('/',(request,response)=>{
    const {name,email,password,password2,tipo} = request.body
    console.log(name,email,password,password2)

    if(!name || !email || !password || !password2 || !tipo){
        return response.status(400).json({error:'Todos los campos son requeridos'})
    }else{
        //guardar en la BD
        let usuario = new User()
        usuario.name = name
        usuario.email = email
        usuario.password = password
        usuario.tipo = tipo

        async function guardarUsuario() {
            await usuario.save()
            const usuarios = await User.find()
            console.log(usuarios)
        }
        guardarUsuario().catch(console.error)

        return response.status(200).json({msg:'Se ha creado el nuevo usuario'})
    }
})

userRouter.post('/login', async (request, response) => {
    const { email, password } = request.body

    if (!email || !password) {
        return response.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    try {
        const userSession = await User.findOne({ email })
        if (!userSession) {
            return response.status(400).json({ message: 'Usuario invalido' })
        }

        const passwordSession = await User.findOne({password})
        if (!passwordSession) {
            return response.status(400).json({ message: 'Contraseña incorrecta' })
        }

        const userData = {
            id: userSession.id,
            name: userSession.name,
            email: userSession.email,
            tipo: userSession.tipo
        }

        return response.status(200).json({ message: 'Autenticación exitosa', user:userData, tipo: userSession.tipo })
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        return response.status(500).json({ message: 'Error al iniciar sesión' })
    }
})

//consultar
userRouter.get('/',async (request,response)=>{
    try{
        const usuarios = await User.find()
        return response.status(200).json(usuarios)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener los usuarios'})
    }
})

//obtener lista de usuarios
userRouter.get('/',async(request,response)=>{
    try{
        const listado = await User.find()
        return response.status(200).json({textOk:true,data:listado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})

//editar usuario
userRouter.post('/edit-user',async(request,response)=>{
    try{
        const {name,email,password,password2} = request.body

        if(!name && !email && !password && !password2){
            return response.status(400).json({error:'Todos los campos son obligatorios'})
        }else{
            const updateUser = await User.findOneAndUpdate({_id:id},{name:name,email:email,password:password})

            await updateUser.save()

            return response.status(200).json({msg:'Se ha actualizado exitosamente'})
        }
    }catch(error){
        return response.status(400).json({error:'error'})
    }
})

//eliminar usuario
userRouter.post('/eliminar-user',async (request,response)=>{
    const {id} = request.body

    try{
        const usuario = await User.deleteOne({_id:id})
        return response.status(200).json({msg:'Se ha eliminado el usuario exitosamente'})
    }catch(error){
        return response.status(400).json({error:'Error'})
    }
})

//verificar el registro
userRouter.get('/validar-confirmacion/:email',async (require,response)=>{
    try{
        //obtener los parametros de request
        const {email} = response.param

        console.log(email)

        //verificar si el usuario existe
        const usuario = await User.findOne({email:email})

        if(!usuario){
            response.send('Error: El usuario no esta registrado')
        }else if(usuario.verified){
            response.send('Error: El usuario ya esta verificado')
        }else{
            //actualizar verificacion
            const actualizarUsuario = await User.findOneAndUpdate({email:email},{verified:true})
            await actualizarUsuario.save()

            //redireccionar
            //return response.redirect()
            //falta crear front de confirmar
        }
    }catch(error){
        console.log(error)
    }
})

module.exports = userRouter