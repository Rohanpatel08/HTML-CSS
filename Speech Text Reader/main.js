const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const closeBtn = document.getElementById('close');
const toggleBtn = document.getElementById('toggle');
const readBtn = document.getElementById('read');

const data = [
    {
        img: './imgs/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        img: './imgs/angry.jpg',
        text: "I'm angry"
    },
    {
        img: './imgs/food.jpg',
        text: "I'm Hungry"
    },
    {
        img: './imgs/grandma.jpg',
        text: "I want to go grandmas"
    },
    {
        img: './imgs/happy.jpg',
        text: "I'm Happy"
    },
    {
        img: './imgs/home.jpg',
        text: "I want to go Home"
    },
    {
        img: './imgs/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        img: './imgs/outside.jpg',
        text: "I want to go outside"
    },
    {
        img: './imgs/sad.jpg',
        text: "I'm Sad"
    },
    {
        img: './imgs/scared.jpg',
        text: "I'm Scared"
    },
    {
        img: './imgs/school.jpg',
        text: "I want to go School"
    },
    {
        img: './imgs/tired.jpg',
        text: "I'm tired"
    },
]

data.forEach((item)=>{
    console.log(item);

    const {img, text} = item;

    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
        <img src=${img} alt="${text}"/>
        <p class="info">${text}</p>
    `;

    box.addEventListener('click',()=>{
        setTextMessage(text);
        speakText();

        box.classList.add('active');

        setTimeout(()=>{box.classList.remove('active')},1000)
    })
    main.append(box)
})

let message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices(){
    voices = speechSynthesis.getVoices();

    voices.forEach(voice=>{
        const option = document.createElement('option')
        option.value = voice.name;

        option.innerText = `${voice.name} ${voice.lang}`;

        voiceSelect.append(option)
    })
}

function setTextMessage(text){
    message.text = text;
}

function speakText(){
    speechSynthesis.speak(message)
}

speechSynthesis.addEventListener('voiceschanged', getVoices)

toggleBtn.addEventListener('click',()=>{
    const textBox = document.getElementById('text-box');
    textBox.classList.add('show');
})
closeBtn.addEventListener('click',()=>{
    const textBox = document.getElementById('text-box');
    textBox.classList.remove('show');
})

voiceSelect.addEventListener('change',(e)=>{
    message.voice = voices.find(voice => voice.name === e.target.value)
})

readBtn.addEventListener('click',()=>{
    setTextMessage(textarea.value)
    speakText();
})
getVoices();