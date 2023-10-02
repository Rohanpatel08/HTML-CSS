const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')


let data = []

//get Random User
async function getRandomUser(){
    let res = await fetch(`https://randomuser.me/api`);
    const data = await res.json();
    
    let user = data.results[0]

    let newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

//Double the money
function doubleMoney(){
    data = data.map(item => {
        return {...item, money: item.money * 2};
    });

    updateDOM();
}

//sort By Money
function sortByMoney(){
    data = data.sort((a,b)=>b.money - a.money);

    updateDOM();
}

//filter By Money
function showMillionaires(){
    data = data.filter(item => item.money > 1000000);

    updateDOM();
} 

//calculate all wealth
function calculateWealth(){
    let total = data.reduce((acc, user)=>(
        acc +=user.money
    ),0)
    
    const wealth = document.createElement('div');
    wealth.innerHTML = `Total Wealth: <strong>${formatMoney(total)}</strong>`;
    wealth.classList.add('wealth');
    main.appendChild(wealth)
}

//add User
function addData(user){
    data.push(user);

    updateDOM();
}

//update DOM
function updateDOM(inputData = data){
    //clear Main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    inputData.forEach(item => {
        const ele = document.createElement('div');
        ele.classList.add('person');
        ele.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(ele)
    });
}

//format Money

function formatMoney(number){
    return '₹ ' +number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



//Event Listeners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

