window.addEventListener('load', () => {
    console.log("hello")
    const addFood = document.querySelector(".addFood");
    addFood.addEventListener('click', () => {
        window.location.replace("/food-adder/");
    })
    const logoutBtn = document.querySelector(".logout");
        logoutBtn.addEventListener('click', () => {
            window.location.replace("/log-out/");
        })
})
