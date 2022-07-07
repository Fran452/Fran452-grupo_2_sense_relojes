let link = document.URL.split('/')[0] + '//' + document.URL.split('/')[2] + '/' 
const botonCompra = document.querySelector('.carrito');

botonCompra.addEventListener('click',e => {
    let idProducto = document.URL.split('/')[4]
    fetch(`${link}/user/addCarrito/${idProducto}`)
        .then(valor => {
            valor.json();
        })
        .then(valor =>{
            console.log(enviadoAlCarrito); 
        })
})