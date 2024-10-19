import { editarProducto, obtenerProducto } from "./api.js";
import { mostrarAlerta } from './mostrarAlerta.js'

const nombreInput = document.querySelector('#nombre')
const precioInput = document.querySelector('#precio')
const categoriaInput = document.querySelector('#categoria')
const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')
const cerrarBtn = document.querySelector('#cerrar-btn')
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded',async()=>{
    //verificar que el producto exista
    const parametroURL = new URLSearchParams(window.location.search)
    //console.log(window.location.search)
    const idProducto = parametroURL.get('id')
    //console.log(idProducto)
    const producto = await obtenerProducto(idProducto)
    //console.log(producto)
    mostrarProducto(producto)

    //registro de la actualizacion del producto
    formulario.addEventListener('submit',validarProducto)
})

function mostrarProducto(producto){
    const {nombre,precio,categoria,id} = producto

    nombreInput.value = nombre
    precioInput.value = precio
    categoriaInput.value = categoria
    idInput.value = id
}

async function validarProducto(e){
    e.preventDefault()
    const producto = {
        nombre:nombreInput.value,
        precio:precioInput.value,
        categoria:categoriaInput.value,
        id:idInput.value
    }

    if(validar(producto)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }else{
        await editarProducto(producto)
        window.location.href= 'index.html'
    }
}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='')
}

cerrarBtn.addEventListener('click', async (e) => {
    localStorage.removeItem('user');
});
