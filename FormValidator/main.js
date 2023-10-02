var form = document.getElementById('form')
var username = document.getElementById('username')
var email = document.getElementById('email')
var password = document.getElementById('password')
var Cpassword = document.getElementById('Cpassword')

//Display Error message
function showError(input, msg){
    var formControl = input.parentElement;
    formControl.className = 'form-control failed';
    var small = formControl.querySelector('small')
    small.innerText = msg
}

//Display success message
function showSuccess(input){
    var formControl = input.parentElement;
    formControl.className = 'form-control success';
    
}

//check length of inputs
function checkLength(input, min, max){
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters long.`);
    }else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less then ${max} characters.`)
    }else{
        showSuccess(input)
    }
}

//trim field name to display
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Validate email 
function isValidEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    }else{
        showError(input, 'Email is not valid');
    }
}

//Display field is required message
const required=(inputArr)=>{
    inputArr.forEach(item => {
        if (item.value.trim() === '') {
            showError(item, `${getFieldName(item)} is required`)
        }else{
            showSuccess(item)
        }
    });
}

//Match passwords
function matchPasswords(pass1, paas2){
    if (pass1.value == paas2.value) {
        showSuccess(paas2)
    }else{
        showError(paas2, 'Enter same password')
    }
}

//Event listeners
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    required([username, email, password, Cpassword]);
    checkLength(username, 3, 20);
    checkLength(password, 6, 16);
    isValidEmail(email)
    matchPasswords(password,Cpassword)
})