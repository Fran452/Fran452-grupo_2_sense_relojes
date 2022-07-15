let link = document.URL.split('/')[0] + '//' + document.URL.split('/')[2] 
const botonSalir = document.querySelector("#salir");
console.log(botonSalir);

botonSalir.addEventListener("click", e => {
    console.log("entre al click");
    //location.href = `${link}/user/salir`
    fetch(`${link}/user/salir`)
    .then(respuesta => respuesta.json())
    .then(objeto => console.log(objeto))
    .catch(Error => console.log(Error))
    
    location.href = `${link}/`
})