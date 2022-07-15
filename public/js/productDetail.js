window.addEventListener('load',() => {

    let config = document.querySelector(".setting")
    
    config.addEventListener("click",event => {
        window.location.assign("/edit")
    })

})

