const eliminar = document.querySelectorAll(".elim");
const idpreoducto = document.querySelectorAll(".idProduct");

eliminar.forEach( boton =>{
    
    boton.addEventListener("click", e => {
        const idpreoducto = document.querySelector(".idProduct + input");
        console.log("se selecciono el boton");
        console.log(idpreoducto); 
    })
})