const navegacion = document.querySelector('#navegacion')

const crearNavHome = ()=>{
    navegacion.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">

            <a href="/" class="text-blue-50 font-bold text-xl">Restaurant App</a>
            <!--movil-->
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg">
                <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>

            <!--PC-->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition ease-in-out">Login</a>
                <a href="/registro/" class="text-black bg-white hover:bg-blue-700 font-bold rounded-lg px-4 py-2 transition ease-in-out">Registro</a>
            </div>

            <!--movil-->
            <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
                <a href="/login/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out">Login</a>
                <a href="/registro/" class="text-black bg-white font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out">Registro</a>
            </div>
    </div>
`
}

const crearNavRegistro = ()=>{
    navegacion.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">

            <a href="/" class="text-blue-50 font-bold text-xl">Restaurant App</a>
            <!--movil-->
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg">
                <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>

            <!--PC-->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition ease-in-out">Login</a>
            </div>

            <!--movil-->
            <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
                <a href="/login/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out">Login</a>
            </div>
    </div>
`
}

const crearNavLogin = ()=>{
    navegacion.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">

            <a href="/" class="text-blue-50 font-bold text-xl">Restaurant App</a>
            <!--movil-->
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg">
                <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>

            <!--PC-->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/registro/" class="text-black bg-white hover:bg-blue-700 font-bold rounded-lg px-4 py-2 transition ease-in-out">Registro</a>
            </div>

            <!--movil-->
            <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
                <a href="/registro/" class="text-black bg-white font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out">Registro</a>
            </div>
    </div>
`
}

//crearNavHome()
//agregar validaciones para generar la barra de navegacion
if(window.location.pathname === '/'){
    crearNavHome()
}else if(window.location.pathname === '/registro/'){
    crearNavRegistro()
}else if(window.location.pathname === '/login/'){
    crearNavLogin()
}

const navBtn = navegacion.children[0].children[1]
//console.log(navBtn)

navBtn.addEventListener('click',e=>{
    //console.log('click')
    const menuMobile= navegacion.children[0].children[3]
    //console.log(menuMobile)

    if(!navBtn.classList.contains('active')){
        //menu movil cerrado y vamos a mostrar el despliegue
        navBtn.classList.add('active')
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />'
        menuMobile.classList.remove('hidden')
        menuMobile.classList.add('flex')
    }else{
        navBtn.classList.remove('active')
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />'
        menuMobile.classList.remove('flex')
        menuMobile.classList.add('hidden')
    }
})