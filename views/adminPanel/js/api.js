export const nuevoProducto = async producto=>{
    try{
        /*await fetch(url,{
            method:'POST',
            body: JSON.stringify(producto),
            header:{
                'Content-Type':'application/json'
            }
        })*/
        const response = await axios.post('/api/productos',producto)
    }catch(error){
        console.log(error)
    }
}

export const obtenerProductos = async ()=>{
    try{
        //const resultado = await fetch(url)
        //const productos = await resultado.json()
        const response = await axios.get('/api/productos')
        const productos = await response.data
        return productos
    }catch(error){
        console.log(error)
    }
}

export const obtenerProducto = async id =>{
    try{
        //const resultado = await fetch(`${url}/${id}`)
        //const producto = await resultado.json()
        const response = await axios.get(`/api/productos/${id}`)
        const producto = await response.data
        return producto
    }catch(error){
        console.log(error)
    }
}

export const editarProducto = async producto =>{
    try{
        /*await fetch(`${url}/${producto.id}`,{
            method:'PUT',
            body:JSON.stringify(producto),
            headers:{
                'Content-Type':'application/json'
            }
        })*/
       const response = await axios.put(`/api/productos/${producto.id}`,producto)
    }catch(error){
        console.log(error)
    }
}

export const eliminarProducto = async id =>{
    try{
        /*await fetch(`${url}/${id}`,{
            method:'DELETE'
        })*/
       const response = axios.delete(`/api/productos/${id}`)
    }catch(error){
        console.log(error)
    }
}