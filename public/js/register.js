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
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };
          let error = document.querySelector('#errorMail');
          if (!validateEmail(email.value)){
            error.innerText = "No se cumple con el formato de un mail convencional";
          }else{
            error.innerText = '';
          }
    })    

    telefono.addEventListener('blur', e => {
        let error = document.querySelector('#telefonoError');
        if(telefono.value.length < 7){
            error.innerText = 'El telefono tiene que contener 8 numeros';
        }else{
            error.innerText + '';
        }
    })    

    fechaNacimiento.addEventListener('blur', e => {
        let fechaActual = new Date()
        let error = document.querySelector('#errorEdad')
        console.log(`anio enviado: ${parseInt(fechaNacimiento.value.split('-')[0])} anio actual: ${parseInt(fechaActual.getFullYear())} entonces la edad actual es de ${parseInt(fechaActual.getFullYear()) - parseInt(fechaNacimiento.value.split('-')[0]) }`);
        if(parseInt(fechaActual.getFullYear()) - parseInt(fechaNacimiento.value.split('-')[0]) < 18){
            error.innerText = 'Solo se pueden registrar mayores de edad';
        }else{
            error.innerText = '';
        }
    })    

    pasword.addEventListener('blur', e => {
        let error = document.querySelector('#errorPasword')
        if(pasword.value.length < 8){
            error.innerText = 'La contraseña debe contener al menos 8 caracteres'
        }else{
            error.innerText = ""
        }
    })   
    paswordConfirm.addEventListener('blur', e => {
        let error = document.querySelector('#errorPaswordC')
        if(pasword.value != paswordConfirm.value ){
            error.innerText = 'Las contraseñas no son las mismas'
        }else{
            error.innerText = ""
        }

    })    
})