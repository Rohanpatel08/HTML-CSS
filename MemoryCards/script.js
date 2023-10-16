const clearBtn = document.getElementById('clear')
const showBtn = document.getElementById('show')
const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const addContainer = document.getElementById('add-container')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')

let currentActiveCards = 0

const cardsEl = [];

const cardsData = getCardsData();

// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is React JS?',
//         answer: 'A JS Framework'
//     },
//     {
//         question: 'Full Form of NaN?',
//         answer: 'Not A Number'
//     },
// ]

function createCards() {
    cardsData.forEach((data, index) => {
        createCard(data, index)
    })
}

function createCard(data, index) {
    const card = document.createElement('div')

    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active')
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                    <p>
                        ${data.answer}
                    </p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'))
    cardsEl.push(card);
    cardsContainer.append(card)


    updateCurrentText();
}

function updateCurrentText() {
    currentEl.innerText = `${currentActiveCards + 1}/${cardsEl.length}`;
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards
}

function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCards].className = 'card left';

    currentActiveCards = currentActiveCards + 1;

    if (currentActiveCards > cardsEl.length - 1) {
        currentActiveCards = cardsEl.length - 1
    }

    cardsEl[currentActiveCards].className = 'card active';

    updateCurrentText();
})

prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCards].className = 'card right';

    currentActiveCards = currentActiveCards - 1;

    if (currentActiveCards < 0) {
        currentActiveCards = 0
    }

    cardsEl[currentActiveCards].className = 'card active';

    updateCurrentText();
})

showBtn.addEventListener('click', () => {
    addContainer.classList.add('show')
})
hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('show')
})

addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer }

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
})

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})