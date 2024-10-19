import { obtenerProductos, eliminarProducto } from './api.js'

const listado = document.querySelector('#listado-Productos')
const cerrarBtn = document.querySelector('#cerrar-btn')
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded',mostrarProductos)
listado.addEventListener('click',confirmarEliminar)

async function mostrarProductos(){
    const productos = await obtenerProductos()
    //console.log(producto)

    productos.forEach(producto=>{
        const {nombre,precio,categoria,id} = producto
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <p class="font-bold leading-5 text-gray-700 text-lg">${nombre}</p>
            </td>

            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <p class="font-bold leading-5 text-gray-700 text-lg">$${precio}</p>
            </td>

            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <p class="font-bold leading-5 text-gray-700 text-lg">${categoria}</p>
            </td>

            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <a class="text-teal-600 hover:text-teal-900 mr-5" href="/admin-panel/editar-producto.html?id=${id}">Editar</a>
                <a class="text-red-600 hover:text-red-900 eliminar" href="#" data-producto="${id} ">Eliminar</a>
            </td>
        `
        listado.appendChild(fila)
    })
}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const productoId = (e.target.dataset.producto)
        //console.log(productoId)

        const confirmar = confirm('¿Desea eliminar este producto?')

        if(confirmar){
            await eliminarProducto(productoId)
            location.reload()
        }
    }
}

cerrarBtn.addEventListener('click', async (e) => {
    localStorage.removeItem('user');
});