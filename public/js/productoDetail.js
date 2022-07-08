let link = document.URL.split('/')[0] + '//' + document.URL.split('/')[2] + '/' 
const botonCompra = document.querySelector('.carrito');

botonCompra.addEventListener('click',e => {
    let idProducto = document.URL.split('/')[4]
    console.log("ENTRE AL BOTON");
    console.log(`${link}user/addCarrito/${idProducto}`);
    fetch(`${link}user/addCarrito/${idProducto}`)
        .then(valor => {
           
            return valor.json();
            console.log(valor);
        })
        .then(final => {
            console.log(final); 
        })
})