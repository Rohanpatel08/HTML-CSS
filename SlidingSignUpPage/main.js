const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', ()=> 
container.classList.add('right-panel-active'));

signInButton.addEventListener('click', ()=> 
container.classList.remove('right-panel-active'));

let tempSignUpEmail;
let tempSignUpPassword;

function handleSignUp(){
    let signUpName = document.getElementById('signUpName').value
    let signUpEmail = document.getElementById('signUpEmail').value
    let signUpPassword = document.getElementById('signUpPassword').value
    // console.log(loginemail, loginpassword)
    tempSignUpEmail = signUpEmail;
    tempSignUpPassword = signUpPassword;
    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    }else{
        userList = JSON.parse(localStorage.getItem('userList'))
    }
    userList.push({
        signUpName: signUpName,
        signUpEmail: signUpEmail,
        signUpPassword: signUpPassword
    })
    localStorage.setItem('userList', JSON.stringify(userList));
}

function handleSignIn(){
    let signInEmail = document.getElementById('signInEmail').value
    let signInPassword = document.getElementById('signInPassword').value
    console.log(signInEmail, signInPassword)
    let userList = localStorage.getItem('userList')
    // console.log(userList)
    // console.log(userList.signUpEmail[0])
    if (signInEmail != tempSignUpEmail && signInPassword != tempSignUpPassword) {
        alert("Your email or password is incorrect...")
    }else{
        alert("You logged in successfully....")
    }
}