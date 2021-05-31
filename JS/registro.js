//REGISTRO\\

const formulario = document.querySelector('.formulario');

formulario.addEventListener('submit', (e) => {
e.preventDefault();

const email = document.querySelector('#email').value;
const contraseña = document.querySelector('#contraseña').value;

auth
    .createUserWithEmailAndPassword(email, contraseña)
    .then(userCredential => {

        formulario.reset();
        
        console.log('Registrado')

    })

})

