const msgEl = document.getElementById('msg');
let randomNum;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function getrandomNum(){
    randomNum =  Math.floor(Math.random() * 100) + 1;
    console.log(randomNum);
}
getrandomNum()

//write what user speaks
function writeMessage(msg){
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
        <div>GO HIGHER</div>
    `;
}

//check msg Number
function checkNumber(msg){
    const num = +msg

    if (Number.isNaN(num)) {
        msgEl.innerHTML = '<div>That is not a valid number</div>';
        return;
    }
    if (num > 100 || num < 1) {
        msgEl.innerHTML = '<div>Number between 1 to 100 is only valid...</div>';
        return;
    }

    if (num == randomNum) {
        document.body.innerHTML = `
            <h2>Congratulations! You guessed right Number <br><br>
            Number was ${num}</h2>
            <button class='play-again' id='play-again'>Play Again</button>
        `;
    }else if (num > randomNum) {
        msgEl.innerHTML = '<div>GO LOWER</div>'
    }else{
        msgEl.innerHTML = '<div>GO HIGHER</div>'
    }
}

recognition.addEventListener('result', (e)=>{
    let msg = e.results[0][0].transcript
    console.log(msg);

    writeMessage(msg);
    checkNumber(msg);
})

recognition.addEventListener('end',()=> recognition.start());

document.body.addEventListener('click',(e)=>{
    if (e.target.id == 'play-again') {
        console.log('clicked');
        window.location.reload();
    }
})