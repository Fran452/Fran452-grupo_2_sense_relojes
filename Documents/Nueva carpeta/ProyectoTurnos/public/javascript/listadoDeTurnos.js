const botonTurnos = document.querySelector("#botonGenerarTurno")
botonTurnos.addEventListener("click", () => {
    fetch("http://localhost:3000/admin/turno").then(respuesta => respuesta.json()).then(respuestaf => console.log(respuestaf))
})