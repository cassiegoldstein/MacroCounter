window.addEventListener('load', () => {
    const submit = document.querySelector('#getfood');
    const ingredient = document.querySelector("#ingr");
    const parent = document.querySelector(".card-holder");
    const btn = document.querySelector(".squareBtn");
    btn.addEventListener('click', () => {
        window.location.replace("/home/");
    });


    submit.addEventListener('click', (e) => {
        e.preventDefault();
        //get value of ingredient
        let ingr = ingredient.value;

        //api key for images
        const pixApiKey = '32114352-7dd227c2beee268f32aa68cbd'

        //add image to card using input value and API call
        axios.get(`https://pixabay.com/api/?key=${pixApiKey}&q=${ingr}&image_type=photo`)
            .then(response => {

                //create div for card
                const card = document.createElement("div");
                card.classList.add("card");
                card.style.width = "24rem";
                //add image
                const foodImage = document.createElement("img");
                foodImage.src = response.data.hits[0].largeImageURL;
                card.appendChild(foodImage);
                console.log(response.data.hits[0].largeImageURL);

                //get nutritional info
                axios.get(`https://api.edamam.com/api/nutrition-data?app_id=01b440e0&app_key=c5f5650c26904e10705545e22e7b9dca&nutrition-type=logging&ingr=${ingr}`).then(response => {
                    console.log(response.data);
                    const fatG = (response.data.totalNutrients.FAT.quantity).toFixed(2);
                    const proteinG = (response.data.totalNutrients.PROCNT.quantity).toFixed(2);

                    const carbsG = (response.data.totalNutrients.CHOCDF.quantity).toFixed(2);

                    //add card body
                    const cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");

                    const ingredientName = document.createElement("h5");
                    ingredientName.classList.add("card-title");
                    ingredientName.classList.add("ingrName");
                    ingredientName.innerHTML = ingr;
                    cardBody.appendChild(ingredientName);

                    card.appendChild(cardBody);

                    //add unordered list to card
                    const list = document.createElement("ul");

                    list.classList.add("list-group");
                    list.classList.add("list-group-flush");

                    //add list item
                    const item1 = document.createElement("li");
                    item1.classList.add("list-group-item");

                    //make row
                    const proteinRow = document.createElement("div");
                    proteinRow.classList.add("row");
                    proteinRow.classList.add("center-row");

                    //make first column
                    const proteinCol1 = document.createElement("div");
                    proteinCol1.classList.add("col-6");

                    proteinCol1.innerHTML = "Protein";

                    //append column to row

                    proteinRow.appendChild(proteinCol1);

                    //make second column

                    const proteinCol2 = document.createElement("div");
                    proteinCol2.classList.add("col-6");

                    proteinCol2.innerHTML = `${proteinG}g`;

                    //append column to row
                    proteinRow.appendChild(proteinCol2);

                    //append div to list item
                    item1.appendChild(proteinRow);

                    //append list item to list
                    list.appendChild(item1);

                    //add second list item
                    const item2 = document.createElement("li");
                    item2.classList.add("list-group-item");

                    //make row
                    const carbsRow = document.createElement("div");
                    carbsRow.classList.add("row");
                    carbsRow.classList.add("center-row");


                    //make first column
                    const carbsCol1 = document.createElement("div");
                    carbsCol1.classList.add("col-6");

                    carbsCol1.innerHTML = "Carbs";

                    //append column to row

                    carbsRow.appendChild(carbsCol1);

                    //make second column

                    const carbsCol2 = document.createElement("div");
                    carbsCol2.classList.add("col-6");

                    carbsCol2.innerHTML = `${carbsG}g`;

                    //append column to row

                    carbsRow.appendChild(carbsCol2);


                    //append div to list item
                    item2.appendChild(carbsRow);

                    //append list item to list
                    list.appendChild(item2);


                    //add third list item
                    const item3 = document.createElement("li");
                    item3.classList.add("list-group-item");

                    //make row
                    const fatRow = document.createElement("div");
                    fatRow.classList.add("row");
                    fatRow.classList.add("center-row");


                    //make first column
                    const fatCol1 = document.createElement("div");
                    fatCol1.classList.add("col-6");

                    fatCol1.innerHTML = "Fats";

                    //append column to row

                    fatRow.appendChild(fatCol1);

                    //make second column

                    const fatCol2 = document.createElement("div");
                    fatCol2.classList.add("col-6");

                    fatCol2.innerHTML = `${fatG}g`;

                    //append column to row

                    fatRow.appendChild(fatCol2);


                    //append div to list item
                    item3.appendChild(fatRow);

                    //append list item to list
                    list.appendChild(item3);


                    //append unordered list to card
                    card.appendChild(list);

                    //create last card
                    const links = document.createElement("div");
                    links.classList.add("card-body");

                    const deleteRow = document.createElement("div");
                    deleteRow.classList.add("row");
                    deleteRow.classList.add("center-row");


                    const deleteCol1 = document.createElement("div");
                    deleteCol1.classList.add("col-6");

                    const dl = document.createElement("a");
                    dl.classList.add("card-link");
                    dl.href = "#"
                    dl.innerHTML = 'Delete';


                    //append link to column
                    deleteCol1.appendChild(dl);

                    //append column to row
                    deleteRow.appendChild(deleteCol1);


                    const addCol1 = document.createElement("div");
                    addCol1.classList.add("col-6");

                    const add = document.createElement("a");
                    add.classList.add("card-link");
                    add.href = "#"
                    add.innerHTML = 'Add';


                    //append link to column
                    addCol1.appendChild(add);

                    //append column to row
                    deleteRow.appendChild(addCol1);


                    //append row to links
                    links.appendChild(deleteRow);


                    //append links to card
                    card.appendChild(links);


                    dl.addEventListener('click', () => {
                        window.location.reload();
                    })

                    add.addEventListener('click', () => {
                        //add functionality to move to next page and add data
                    })

                }).catch(error => {
                    ingredientName.innerHTML = "Food not found";
                    proteinCol2.innerHTML = "Not found";
                    carbsCol2.innerHTML = "Not found";
                    fatCol2.innerHTML = "Not found";

                })

                //add card to parent div
                parent.appendChild(card);

            }).catch(error => {
                console.log(error)
            })



    })
})
