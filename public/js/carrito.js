const eliminar = document.querySelectorAll(".eliminar");
let link = document.URL.split('/')[0] + '//' + document.URL.split('/')[2] + '/' 

eliminar.forEach( boton =>{
    boton.addEventListener("click", e => {
        console.log("se selecciono el boton");
        console.log(boton.value);
        console.log(`${link}user/deleteProduc/${boton.value}`);
        fetch(`${link}user/deleteProduc/${boton.value}`)
            .then( producto => producto.json())
            .then( json => console.log(json));
        location.reload()
    })
})


