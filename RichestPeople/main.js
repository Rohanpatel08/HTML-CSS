const peopleList = document.getElementById('draggable-list');

const checkBtn = document.getElementById('check');

let dragStartIndex;

let listItems = [];

const richestPeople = [
    'Elon Musk',
    'Jeff Bezos',
    'Larry Ellison',
    'Warren Buffett',
    'Berkshire Hathaway',
    'Bill Gates',
    'Michael Bloomberg',
    'Carlos Slim Helu',
    'Mukesh Ambani',
    'Steve Ballmer'
]
displayPeople();

function displayPeople(){
    [...richestPeople]
        .map(a=>({value: a, sort: Math.random()}))
        .sort((a,b)=> a.sort - b.sort)
        .map(a=>a.value)
        .forEach((person, index)=>{
        const listItem = document.createElement('li');  

        listItem.setAttribute('data-index', index);
        // listItem.classList.add('wrong')
        listItem.innerHTML = `
            <span class="number">${index +1}</span>
            <div class='draggable' draggable="true">
                <p class='name'>${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        listItems.push(listItem)

        peopleList.append(listItem)
    });

    addEventListeners();
}

function dragStart(){
    // console.log('dragStart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
function dragOver(e){
    // console.log('dragOver');
    e.preventDefault();
}
function dragDrop(){
    // console.log('dragDrop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function dragEnter(){
    // console.log('dragEnter');
    this.classList.add('over');
}
function dragLeave(){
    // console.log('dragLeave');
    this.classList.remove('over');
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart',dragStart);
    })
    
    dragListItems.forEach(item =>{
        item.addEventListener('dragover',dragOver);
        item.addEventListener('drop',dragDrop);
        item.addEventListener('dragenter',dragEnter);
        item.addEventListener('dragleave',dragLeave);
    })
}

checkBtn.addEventListener('click',(e)=>{
    listItems.forEach((listItem, index)=>{
        const pName = listItem.querySelector('.draggable').innerText.trim();

        if (pName !== richestPeople[index]) {
            listItem.classList.add('wrong')
        }else{
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
            
        }
    })
})