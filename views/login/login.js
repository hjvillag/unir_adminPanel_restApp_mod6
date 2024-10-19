import {createNotification} from "../components/notificaciones.js"
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const formulario = document.querySelector('#formulario')
const btnLogin = document.querySelector('#form-btn')
const notification = document.querySelector('#notification')

const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

let valemail = false
let valpass = false

emailInput.addEventListener('input', e => {
    valemail = emailVal.test(e.target.value)
    validar(emailInput, valemail)
})

passwordInput.addEventListener('input', e => {
    valpass = passwordVal.test(e.target.value)
    validar(passwordInput, valpass)
})

formulario.addEventListener('submit', async e => {
    e.preventDefault()

    if (!emailInput.value || !passwordInput.value) {
        createNotification(true, 'Todos los campos son obligatorios');
            setTimeout(() => {
                notification.innerHTML = '';
            }, 3000);
        return
    }

    try {
        if (valemail && valpass) {
            const response = await axios.post('/api/users/login', {
                email: emailInput.value,
                password: passwordInput.value,
            })

            const { message, user, tipo } = response.data

            if (response.status === 200) {
                if (message === 'Autenticación exitosa') {
                    createNotification(false, message)
                        setTimeout(() => {
                            notification.innerHTML = '';
                        }, 3000);

                    if (tipo === 'admin') {
                        localStorage.setItem('user',JSON.stringify(user))
                        window.location.href = '/admin-panel'
                    } else if (tipo === 'user') {
                        localStorage.setItem('user',JSON.stringify(user))
                        window.location.href = '/restaurant-app'
                    }
                }
            } else {
                createNotification(false, message)
                        setTimeout(() => {
                            notification.innerHTML = '';
                        }, 3000);
            }
        } else {
            createNotification(true, 'Todos los campos son obligatorios')
                        setTimeout(() => {
                            notification.innerHTML = '';
                        }, 3000);
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            createNotification(true, error.response.data.message)
                        setTimeout(() => {
                            notification.innerHTML = '';
                        }, 3000);
        } else {
            createNotification(true, 'Error al conectar al servidor')
                        setTimeout(() => {
                            notification.innerHTML = '';
                        }, 3000);
        }
    }
})

const validar = (input, val) => {
    btnLogin.disabled = !(valemail && valpass)
    if(btnLogin.disabled) {
        btnLogin.classList.remove('hover:bg-blue-400','bg-blue-900','border-blue-400')
        btnLogin.classList.add('bg-gray-400/70','cursor-not-allowed','border-gray-400')
    }else{
        btnLogin.classList.remove('bg-gray-400/70','cursor-not-allowed','border-gray-400')
        btnLogin.classList.add('hover:bg-blue-400','bg-blue-900','border-blue-400')
    }

    input.classList.remove('focus:outline-blue-600', 'focus:outline-red-700', 'focus:outline-green-700', 'outline-4')
    if (val) {
        input.classList.add('focus:outline-green-700', 'outline-4')
    } else if (input.value === '') {
        input.classList.add('focus:outline-blue-600')
    } else {
        input.classList.add('focus:outline-red-700', 'outline-4')
    }
}