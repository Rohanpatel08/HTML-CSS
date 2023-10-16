const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of Words
const words = [
    'sigh', 'tense', 'airplane', 'ball', 'pies', 'juice', 'warlike', 'bad', 'north', 'dependent', 'steer', 'silver', 'highfalutin', 'superficial', 'quince', 'eight', 'feeble', 'admit', 'drag', 'loving'
]

//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'Moderate';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'Moderate';

text.focus()

let timeInterval = setInterval(updateTime, 1000);

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}


function displayWord(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);

        gameOver();
    }
}

function gameOver(){
    endGameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your Final Score is: ${score}</p>
        <button onclick='location.reload()'>Reload</button>
    `;

    endGameEl.style.display = 'flex';
}

displayWord();
//

text.addEventListener('input',(e)=>{
    const input = e.target.value;

    if (input === randomWord) {
        displayWord();
        updateScore();
        e.target.value = '';

        if (difficulty === 'Hard') {
            time += 2;
        }else if (difficulty === 'Moderate') {
            time += 3;
        }else{
            time += 5;
        }
        
        updateTime();
    }
})

settingsBtn.addEventListener('click', ()=>{
    settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (e)=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})