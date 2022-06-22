window.addEventListener('load',() => {

    let nombre = document.querySelector('#nombre');
    let email = document.querySelector('#email');
    let telefono = document.querySelector('#telefono');
    let fechaNacimiento = document.querySelector('#birth_date');
    let pasword = document.querySelector('#contraseña');
    let paswordConfirm = document.querySelector('#contraseñaConfirm');

    nombre.addEventListener('blur', e => {
        let error = document.querySelector('#nombreError');
        let numerror = 0
        if(nombre.value.length < 5){ 
            error.innerText = 'El nombre debe contener por lo menos 5 letras \n';
            numerror ++;
        }else{
            numerror --;
            error.innerHTML = ''
        }
        if(!nombre.value.includes(',')){
            error.innerText += 'No se incluye la separacion con , del nombre y apellido'
            numerror ++
        }else if(numerror > 1){
            error.innerText = error.split(',')[0];  
        }
    })

    email.addEventListener('blur', e => {

    })    

    telefono.addEventListener('blur', e => {
        let error = document.querySelector('#errorMail')
        if(telefono.value.length < 7){
            error.innerText = 'El telefono tiene que contener 8 numeros'
        }
    })    

    fechaNacimiento.addEventListener('blur', e => {
        let fechaActual = new Date()
        console.log(fechaNacimiento.value.split('-'));
        console.log(fechaActual.getFullYear());
        if(0){}
    })    

    pasword.addEventListener('blur', e => {

    })   
    paswordConfirm.addEventListener('blur', e => {

    })    
})