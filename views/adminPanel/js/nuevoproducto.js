import {nuevoProducto} from './api.js';
import { mostrarAlerta } from './mostrarAlerta.js'

const cerrarBtn = document.querySelector('#cerrar-btn')
const formulario = document.querySelector('#formulario')
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = '/';
}

formulario.addEventListener('submit',validarProducto)

async function validarProducto(e){
    e.preventDefault()

    const nombre = document.querySelector('#nombre').value
    const precio = document.querySelector('#precio').value
    const categoria = document.querySelector('#categoria').value

    const producto = {
        nombre,
        precio,
        categoria
    }

    if(validar(producto)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }else{
        await nuevoProducto(producto)
        window.location.href= 'index.html'
    }
}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='')
}

cerrarBtn.addEventListener('click', async (e) => {
    localStorage.removeItem('user');
});