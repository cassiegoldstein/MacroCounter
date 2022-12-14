window.addEventListener('load', () => {
    let ingr = "egg";

    axios.get(`https://api.edamam.com/api/nutrition-data?app_id=01b440e0&app_key=c5f5650c26904e10705545e22e7b9dca&nutrition-type=logging&ingr=${ingr}`)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error)
        })

})
