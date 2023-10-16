const wordEl = document.getElementById('word');
const wrongLettersEL = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const playBtn = document.getElementById('play-button');
const notify = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-message');


const figureParts = document.querySelectorAll('.figure-part');

let words = ['programming', 'bottle', 'laptop', 'javascript', 'chair']

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];


function displayWord(){
    wordEl.innerHTML = `
        ${selectedWord
            .split('').map((letter)=>
                `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
            ).join('')
        }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMsg.innerText = 'Congratulations! You Won!';
        popup.style.display = 'flex';
    }
}

function showNotification(){
    console.log('456');
    notify.classList.add('show');
    setTimeout(()=>{
        notify.classList.remove('show');
    },1500);
}


function updateWrongLettersEl(){
    wrongLettersEL.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>': ''}
        ${wrongLetters.map((letter)=> `<span>${letter}</span>`)}
    `;
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length === figureParts.length) {
        finalMsg.innerText = 'You Lost';
        popup.style.display= 'flex';
    }
}

window.addEventListener('keydown',(e)=>{
    if (e.keyCode >=65 && e.keyCode <= 90) {
        const letter = e.key

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            }else{
                console.log('123');
                showNotification();
            }
        }else{
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)

                updateWrongLettersEl();
            }else{
                showNotification();
            }
        }
    }
})

playBtn.addEventListener('click',()=>{
    correctLetters.splice(0)
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
})

displayWord();