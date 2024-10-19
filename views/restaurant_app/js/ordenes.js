const obtenerOrdenes = async ()=>{
    try{
        const response = await axios.get('/api/ordenes')
        const ordenes = await response.data
        return ordenes
    }catch(error){
        console.log(error)
    }
}

const userSession = JSON.parse(localStorage.getItem('user'))
//console.log(userSession)

async function mostrarOrdenes() {
    const ordenes = await obtenerOrdenes();
    //console.log(ordenes);
    let ordenesFiltradas = ordenes.filter(orden => orden.user === userSession.id)

    const listado = document.querySelector('#listado-Ordenes')
    listado.innerHTML = ''

    ordenesFiltradas.forEach((orden)=>{
        const {cliente,propina,subtotal,total,user} = orden
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-bottom border-secondary text-uppercase">
                <p>${cliente.mesa}</p>
            </th>

            <th class="text-center px-3 py-3 border-bottom border-secondary text-uppercase">
                <p>${cliente.hora}</p>
            </th>

            <th class="text-center px-3 py-3 border-bottom border-secondary text-uppercase">
                ${cliente.pedido.map(p => `<p>${p.nombre}</p>`).join('')}
            </th>

            <th class="text-center px-3 py-3 border-bottom border-secondary text-uppercase">
                ${cliente.pedido.map(p => `<p>${p.cantidad}</p>`).join('')}
            </th>

            <th class="text-center px-3 py-3 border-bottom border-secondary text-uppercase">
                <p>$ ${subtotal}</p>
            </th>

            <th class="text-center px-3 py-3 border-bottom border-secondary text-uppercase">
                <p>$ ${propina}</p>
            </th>

            <th class="text-center px-3 py-3 border-bottom border-secondary text-uppercase">
                <p>$ ${total}</p>
            </th>

            <th class="text-center px-3 py-3 border-bottom border-secondary text-uppercase">
                <p>${userSession.name}</p>
            </th>
        `
        listado.appendChild(fila)
    })
}

const main = document.querySelector('#menu')
const section = document.querySelector('#resumen')

document.addEventListener('DOMContentLoaded', () => {
    const ordenesButton = document.querySelector('#ordenes');
    const tabla = document.querySelector('#tabla');
    
    ordenesButton.addEventListener('click', () => {
        tabla.classList.remove('visually-hidden');
        main.classList.add('visually-hidden')
        section.classList.add('visually-hidden')
        mostrarOrdenes();
    });
});
