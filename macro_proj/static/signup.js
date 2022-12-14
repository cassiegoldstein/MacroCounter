window.addEventListener('load', () => {

    const emailEl = document.querySelector(".emailClass");
    const name = document.querySelector(".name");
    const weight = document.querySelector(".weight");
    const gender = document.querySelector(".gender");
    const activityLevel = document.querySelector(".activityLevel");
    const password = document.querySelector(".password");

    const loginBtn = document.querySelector("#login");

    //create error labels
    let errorLabelP = document.createElement("label");
    errorLabelP.classList.add("errorLabel");
    let errorLabelE = document.createElement("label");
    errorLabelE.classList.add("errorLabel");
    

    loginBtn.addEventListener('click', () => {
        //get value of password
        console.log(password.value);
        const passwordEl = document.querySelector(".passwordClass");
        const passwordValue = password.value;
        

        passwordEl.appendChild(errorLabelP);
        emailEl.appendChild(errorLabelE);

        //get value of email
        const emailValue = emailEl.value;

        //get value of name
        const nameValue = name.value;

        //get value of weight
        const weightValue = weight.value;

        //get value of gender
        const genderValue = gender.value.toLowerCase();

        //get value of activity
        const activityValue = activityLevel.value.toLowerCase();


        //check that email isn't empty
        if (emailValue.length === 0) {
            console.log('email is empty');
            errorLabelE.innerText = 'Email field cannnot be empty';
        } else {
            errorLabelE.innerText = '';
            console.log('email is not empty');
        }
        
        
        //check that password isn't empty
        if (passwordValue.length === 0) {
            console.log('password is empty');
            errorLabelP.innerText = 'Password field cannnot be empty';
        } else {
            errorLabelP.innerText = '';
            console.log('password is not empty');
        }
        
        
        //check if user is good to log in
        if(errorLabelP.innerText === '' && errorLabelE.innerText === ''){
            console.log("good to go");
            axios.post('/sign-up/', {
                name: nameValue,
                email: emailValue,
                weight: weightValue,
                gender: genderValue,
                lifestyle: activityValue,
                password: passwordValue,
            }).then((response)=>{
                console.log(response)
                window.location.replace("/log-in/");
            })

    };


    });

});