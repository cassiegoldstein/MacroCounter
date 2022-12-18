window.addEventListener('load', () => {
    //add food
    const addFood = document.querySelector(".addFood");
    addFood.addEventListener('click', () => {
        window.location.replace("/food-adder/");
    })
    //log out
    const logoutBtn = document.querySelector(".logout");
        logoutBtn.addEventListener('click', () => {
            window.location.replace("/log-out/");
        })
    
        //add food method 2
    const rndBtn = document.querySelector(".rndBtn");
    rndBtn.addEventListener('click', () => {
        window.location.replace("/food-adder/");
    })
        
})
