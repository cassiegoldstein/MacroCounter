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
    
        //add to progress bar
        
})
