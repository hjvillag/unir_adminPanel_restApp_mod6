//creamos los selectores
const btnGuardarCliente = document.querySelector('#guardar-cliente')
const cerrarBtn = document.querySelector('#cerrar-btn')
const user = JSON.parse(localStorage.getItem('user'))
const nuevo = document.querySelector('#nuevo')

const nuevaOrden = async orden=>{
    try{
        const response = await axios.post('/api/ordenes',orden)
    }catch(error){
        console.log(error)
    }
}

if (!user) {
    window.location.href = '/';
}

//creamos un objeto para almacenar
let cliente = {
    mesa:'',
    hora:'',
    pedido:[]
}

const categorias = {
    1: 'Pizzas',
    2: 'Postres',
    3: 'Jugos',
    4: 'Comida',
    5: 'Cafe'
}

//creamos el evento click para capturar el formulario
btnGuardarCliente.addEventListener('click',guardarCliente)

//creamos la funcion para guardar
function guardarCliente(){
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;
    //console.log(mesa,hora)

    const camposVacios = [mesa,hora].some(item=>item=='');
    //console.log(camposVacios)

    if(camposVacios){
        //si los campos estan vacios, mostrar error al usuario
        //console.log('campos vacios')
        const existeAlerta = document.querySelector('.invalid-feedback');

        if(!existeAlerta){
            const alerta = document.createElement('div');
            alerta.classList.add('invalid-feedback','d-block','text-center');
            alerta.textContent = 'Todos los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);
            setTimeout(()=>{
                alerta.remove();
            },3000);
        }
    }else{
        //caso de tener todos los campos llenos
        //console.log('campos llenos')
        //registramos en el objeto
        cliente = {...cliente,mesa,hora}
        //console.log(cliente)

        //ocultar la ventana modal despues de que se realice un registro
        let modalForm = document.querySelector('#formulario');
        let modal = bootstrap.Modal.getInstance(modalForm)
        modal.hide()

        mostrarSecciones()
        obtenerMenu()
    }
}

//creamos funcion para mostrar 
function mostrarSecciones(){
    const secciones = document.querySelectorAll('.d-none')
    //console.log(secciones)

    secciones.forEach(item=>item.classList.remove('d-none'))
}

async function obtenerMenu(){
    /*const url = 'http://localhost:3000/menu'

    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(resultado=>mostrarMenu(resultado))
    .catch(error=>console.log(error))*/

    await axios.get('/api/productos')
    .then(response=>response.data)
    .then(response=>mostrarMenu(response))
    .catch(error=>console.log(error))
}

async function mostrarMenu(menu){
    //console.log('ingrese a mostrar');
    //.log(menu);

    const contenido = document.querySelector('#menu .contenido');

    menu.forEach(menu=>{
        const fila = document.createElement('div');
        fila.classList.add('row','border-top');

        const nombre = document.createElement('div');
        nombre.classList.add('col-md-3','py-3');
        nombre.textContent = menu.nombre;
        fila.appendChild(nombre);

        const precio = document.createElement('div');
        precio.classList.add('col-md-3','py-3');
        precio.textContent = `$${menu.precio}`;
        fila.appendChild(precio);

        const categoria = document.createElement('div');
        categoria.classList.add('col-md-3','py-3');
        categoria.textContent = categorias[menu.categoria];
        fila.appendChild(categoria);

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = '';
        inputCantidad.classList.add('form-control');
        inputCantidad.id = `#producto-${menu.id}`;
        inputCantidad.onchange = function(){
            const cantidad = parseInt(inputCantidad.value);
            //console.log({menu,cantidad})
            agregarOrden({...menu,cantidad});
        }

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2','py-3');
        agregar.appendChild(inputCantidad);
        fila.appendChild(agregar);
        

        contenido.appendChild(fila);
    })
}

function agregarOrden(producto){
    //console.log(producto)
    let {pedido} = cliente;

    if(producto.cantidad > 0){
        //validar que exista el producto
        //console.log('cantidad',producto.cantidad)
        if(pedido.some(item=>item.id === producto.id)){
            const pedidoActualizado = pedido.map(item=>{
                if(item.id === producto.id){
                    item.cantidad = producto.cantidad;
                    return item;
                    //console.log(item.cantidad)
                }else{
                    return item;
                }
                
            });
            cliente.pedido = [...pedidoActualizado];
            //console.log('existe',cliente)
            
        }else{
            cliente.pedido = [...pedido,producto];
            //console.log('no existe y lo agrego',cliente)
        }
    }else{
        //cantidad sea igual a 0
        const resultado = pedido.filter(item=>item.id !== producto.id);
        cliente.pedido = resultado;
        //console.log('cant 0',cliente)
    }
    limpiarHTML();

    if(cliente.pedido.length){
        actualizarPedido();
    }else{
        //pedido vacio
        mensajePedidoVacio();
    }   
}

function limpiarHTML(){
    const contenido = document.querySelector('#resumen .contenido');
    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
}

function limpiarHTML2(){
    const contenido = document.querySelector('#menu');
    contenido.classList.remove('bg-light')
    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
}

function limpiarHTML3(){
    const contenido = document.querySelector('#resumen');
    contenido.classList.remove('bg-light')
    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
}

function actualizarPedido(){
    const contenido = document.querySelector('#resumen .contenido');
    const resumen = document.createElement('div');
    resumen.classList.add('col-md-6','card','py-5','px-3','shadow');

    //mostrar la mesa
    const mesa = document.createElement('p');
    mesa.textContent = 'Mesa: ';
    mesa.classList.add('fw-bold');

    const mesaCliente = document.createElement('span');
    mesaCliente.textContent = cliente.mesa;
    mesaCliente.classList.add('fw-normal');
    mesa.appendChild(mesaCliente);

    //mostrar la hora
    const hora = document.createElement('span');
    hora.textContent = 'Hora: ';
    hora.classList.add('fw-bold');

    const horaCliente = document.createElement('span');
    horaCliente.textContent = cliente.hora;
    horaCliente.classList.add('fw-normal');
    hora.appendChild(horaCliente);

    //mostrar los items del menu consumidos
    const heading = document.createElement('h3');
    heading.textContent = 'Pedidos';
    heading.classList.add('my-4');

    const grupo = document.createElement('ul');
    grupo.classList.add('list-group');

    //producto pedido
    const {pedido} = cliente;
    pedido.forEach(i=>{
        const {nombre,precio,cantidad,id} = i;
        const lista = document.createElement('li');
        lista.classList.add('list-group-item');

        //mostrar nombre
        const nombreP = document.createElement('h4');
        nombreP.classList.add('text-center','my-4');
        nombreP.textContent = nombre;

        //mostrar cantidad
        const cantidadP = document.createElement('p');
        cantidadP.classList.add('fw-bold');
        cantidadP.textContent = 'Cantidad: ';

        const cantidadValor = document.createElement('p');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad;

        const precioP = document.createElement('p');
        precioP.classList.add('fw-bold');
        precioP.textContent = 'Precio: ';

        const precioValor = document.createElement('p');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = `$${precio}`;

        const subtotalP = document.createElement('p');
        subtotalP.classList.add('fw-bold');
        subtotalP.textContent = 'Subtotal: ';

        const subtotalValor = document.createElement('p');
        subtotalValor.classList.add('fw-normal');
        subtotalValor.textContent = calcularSubtotal(i);

        //boton para eliminar pedido
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger');
        btnEliminar.textContent = 'Eliminar pedido';

        //agregar evento para eliminar el pedido
        btnEliminar.onclick = function(){
            //console.log('ingrese a eliminar pedido')
            eliminarProducto(id);
        }

        //agregar los labels a los contenedores
        cantidadP.appendChild(cantidadValor);
        precioP.appendChild(precioValor);
        subtotalP.appendChild(subtotalValor);

        lista.appendChild(nombreP);
        lista.appendChild(cantidadP);
        lista.appendChild(precioP);
        lista.appendChild(subtotalP);
        lista.appendChild(btnEliminar);

        grupo.appendChild(lista);
    })

    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(heading);
    resumen.appendChild(grupo);

    //agregamos el contenido
    contenido.appendChild(resumen);
    //console.log(contenido)

    formularioPropinas();
}

function eliminarProducto(id){
    const {pedido} = cliente;
    cliente.pedido = pedido.filter(i=>i.id !== id);

    limpiarHTML();

    if(cliente.pedido.length){
        actualizarPedido();
    }else{
        mensajePedidoVacio();
    }

    //actualizar la cantidad del producto eliminado a null
    document.getElementById(`#producto-${id}`).value = null;
}

function calcularSubtotal(i){
    const {cantidad,precio} = i;
    return `$${cantidad*precio}`;
}

function mensajePedidoVacio(){
    const contenido = document.querySelector('#resumen .contenido');
    const texto = document.createElement('p');
    texto.classList.add('text-center');
    texto.textContent = 'Agrega productos al pedido'
    contenido.appendChild(texto);
}

function formularioPropinas(){
    const contenido= document.querySelector('#resumen .contenido');
    const formulario = document.createElement('div');
    formulario.classList.add('col-md-6','formulario');

    const heading = document.createElement('h3');
    heading.classList.add('my-4');
    heading.textContent = 'Propina: ';

    //propina 5%
    const radio5 = document.createElement('input');
    radio5.type = 'radio';
    radio5.name = 'propina';
    radio5.value = '5';
    radio5.classList.add('form-check-input');
    //crear evento
    radio5.onclick = calcularPropina;

    const radioLabel5 = document.createElement('label');
    radioLabel5.textContent = '5%';
    radioLabel5.classList.add('form-check-label');

    const radioDiv5 = document.createElement('div');
    radioDiv5.classList.add('form-check');

    radioDiv5.appendChild(radio5);
    radioDiv5.appendChild(radioLabel5);

    formulario.appendChild(radioDiv5);
    contenido.appendChild(formulario);

    //propina 10%
    const radio10 = document.createElement('input');
    radio10.type = 'radio';
    radio10.name = 'propina';
    radio10.value = '10';
    radio10.classList.add('form-check-input');
    //crear evento
    radio10.onclick = calcularPropina;

    const radioLabel10 = document.createElement('label');
    radioLabel10.textContent = '10%';
    radioLabel10.classList.add('form-check-label');

    const radioDiv10 = document.createElement('div');
    radioDiv10.classList.add('form-check');

    radioDiv10.appendChild(radio10);
    radioDiv10.appendChild(radioLabel10);

    formulario.appendChild(radioDiv10);
    contenido.appendChild(formulario);
}

function calcularPropina(){
    //console.log(calcularPropina);
    const radioSelect = parseInt(document.querySelector('[name="propina"]:checked').value);
    //console.log(radioSelect);

    const {pedido} = cliente;
    //console.log(pedido);

    let subtotal = 0;
    pedido.forEach(item=>{
        subtotal += item.cantidad * item.precio
    });
    //console.log(subtotal)

    const divTotales = document.createElement('div');
    divTotales.classList.add('total-pagar');

    //propina
    const propina = (subtotal * radioSelect)/100;
    const total = propina + subtotal;
    //console.log(propina)

    //subtotal
    const subtotalParrafo = document.createElement('p');
    subtotalParrafo.classList.add('fs-3','fw-bold','mt-5');
    subtotalParrafo.textContent = 'Subtotal consumo';

    const subtotalP = document.createElement('p');
    subtotalP.classList.add('fs-normal');
    subtotalP.textContent = `$${subtotal}`;
    subtotalParrafo.appendChild(subtotalP);

    const propinaParrafo = document.createElement('span');
    propinaParrafo.classList.add('fs-normal');
    propinaParrafo.textContent = 'Propina: ';

    const propinaP = document.createElement('span');
    propinaP.classList.add('fw-normal');
    propinaP.textContent = `$${propina}`;
    propinaParrafo.appendChild(propinaP);

    //total
    const totalParrafo = document.createElement('p');
    totalParrafo.classList.add('fs-normal');
    totalParrafo.textContent = 'Total a pagar: ';

    const totalP = document.createElement('p');
    totalP.classList.add('fs-normal');
    totalP.textContent = `$${total}`;
    //console.log(total)

    totalParrafo.appendChild(totalP);

    const totalPagarDiv = document.querySelector('.total-pagar');

    if(totalPagarDiv){
        totalPagarDiv.remove();
    }

    divTotales.appendChild(subtotalParrafo);
    divTotales.appendChild(propinaParrafo);
    divTotales.appendChild(totalParrafo);

    const btnCrear = document.createElement('button');
    btnCrear.classList.add('btn','btn-danger');
    btnCrear.textContent = 'Crear orden';
    divTotales.appendChild(btnCrear);

    btnCrear.onclick = function(){
        //console.log('ingrese a crear pedido')
        
        const userSession = JSON.parse(localStorage.getItem('user'))
        const user = userSession.name

        const orden = {
            cliente,
            subtotal,
            propina,
            total,
            user
        }
        //console.log(orden)
        nuevaOrden(orden)
        alert('Orden creada exitosamente')
        limpiarHTML2()
        limpiarHTML3()
        location.reload();
    }

    const formulario = document.querySelector('.formulario');
    formulario.appendChild(divTotales);
}

const menu = document.querySelector('#menu')
const resumen = document.querySelector('#resumen')

nuevo.addEventListener('click', () => {
    tabla.classList.add('visually-hidden')
    menu.classList.remove('visually-hidden')
    resumen.classList.remove('visually-hidden')
})

cerrarBtn.addEventListener('click', async (e) => {
    localStorage.removeItem('user')
    window.location.href = '/'
})
