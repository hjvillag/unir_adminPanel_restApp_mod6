const formulario = document.querySelector('#formulario')
const nameInput = document.querySelector('#name-input')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const matchInput = document.querySelector('#match-input')
const btnRegistro = document.querySelector('#form-btn')
const tipoInput = document.querySelector('#tipo-input')
import {createNotification} from "../components/notificaciones.js"
const notification = document.querySelector('#notification')
//console.log(axios)

const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const nameVal = /^[A-Z][a-zA-Z]*( [a-zA-Z]+)?$/

let valemail = false
let valpass = false
let valMatch = false
let valname = false

nameInput.addEventListener('input',e=>{
    valname = nameVal.test(e.target.value)
    validar(nameInput,valname)

    /*if(e.target.value === ''){
        nameInput.classList.remove('focus-:outline-green-700','outline-4','focus:outline-red-700')
        nameInput.classList.add('focus:outline-blue-600')
    }else{
        nameInput.classList.remove('focus:outline-blue-600')
        nameInput.classList.add('focus:outline-green-700','outline-4')
        valname = true
    }*/
})

emailInput.addEventListener('input',e=>{
    //console.log(e.target.value)
    valemail = emailVal.test(e.target.value)
    //console.log(valemail)
    validar(emailInput,valemail)
    
})

passwordInput.addEventListener('input',e=>{
    //console.log(e.target.value)
    valpass = passwordVal.test(e.target.value)
    validar(passwordInput,valpass)
    validar(matchInput,valMatch)
    //console.log(valpass)
})

matchInput.addEventListener('input',e=>{
    //console.log(e.target.value)
    valMatch = e.target.value === passwordInput.value
    validar(matchInput,valMatch)
    validar(passwordInput,valpass)
})

formulario.addEventListener('submit', async e => {
    e.preventDefault();

    try {
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            password2: matchInput.value,
            tipo: tipoInput.value
        };
        console.log(newUser);

        if (valname && valemail && valpass && valMatch) {
            const response = await axios.post('/api/users', newUser);

            createNotification(false, 'Registro exitoso');
            setTimeout(() => {
                notification.innerHTML = '';
            }, 3000);

            console.log(response);
        } else {
            createNotification(true, 'Todos los campos son requeridos');
            setTimeout(() => {
                notification.innerHTML = '';
            }, 3000);
        }

    } catch (error) {
        if (error.response && error.response.data) {
            createNotification(true, error.response.data.error);
            console.log(error.response.data.error);
        } else {
            createNotification(true, 'Ocurrió un error inesperado');
            console.log(error);
        }

        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000);
    }
});


const validar = (input,val)=>{
    btnRegistro.disabled = valname && valemail && valpass && valMatch ? false : true

    if(val){
        //caso de que el test sea true
        input.classList.remove('focus:outline-blue-600','focus:outline-red-700','outline-4')
        input.classList.add('focus:outline-green-700','outline-4')
    }else if(input.value === ''){
        input.classList.remove('focus:outline-green-700','outline-4','focus:outline-red-700')
        input.classList.add('focus:outline-blue-600')
    }else{
        //caso de que el test sea false
        input.classList.remove('focus:outline-blue-600','focus:outline-green-700','outline-4')
        input.classList.add('focus:outline-red-700','outline-4')
    }
}