//window.addEventListener('load',() => {

const botonCompra = document.querySelector('.carrito');

    botonCompra.addEventListener('click',e => {
        let idProducto = document.URL.split('/')[4]
        let linkProduct = document.URL.split('/')[0] + '//' + document.URL.split('/')[2]
        console.log("ENTRE AL BOTON");
        console.log(`${linkProduct}/user/addCarrito/${idProducto}`);
        fetch(`${linkProduct}/user/addCarrito/${idProducto}`)
            .then(valor => {
                return valor.json();
            })
            .then(final => {
                console.log(final);
                if(final.estus == 1){
                    alert(final.error);
                }
            })
    })
    

//})
