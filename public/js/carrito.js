const eliminar = document.querySelectorAll(".eliminar");

eliminar.forEach( boton =>{
    boton.addEventListener("click", e => {
        console.log("se selecciono el boton");
        console.log(boton.value);
        console.log(`${link}/user/deleteProduc/${boton.value}`);
        fetch(`${link}/user/deleteProduc/${boton.value}`)
            .then( producto => producto.json())
            .then( json => console.log(json));
        location.reload();
    })
});

const modificar = document.querySelectorAll(".cantidad");

modificar.forEach( boton => {
    boton.addEventListener("change", e => {
        console.log(boton.value);
        let productoID = boton.id
        console.log(`${link}/user/cantidadCarrito/${productoID}/?cant=${boton.value}`);
        fetch(`${link}/user/cantidadCarrito/${productoID}/?cant=${boton.value}`,{
            method : 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({cantidad : boton.value})
        })
        .then(retorno => retorno.json())
        .then(json => console.log(json))
        location.reload();
    })
})