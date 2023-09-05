let progress = document.getElementById('progress')
let prev = document.getElementById('prev')
let next = document.getElementById('next')
let circle = document.querySelectorAll('.circle')

let currentActive = 1;
next.addEventListener('click',()=>{
    currentActive++;
    if (currentActive > circle.length) {
        currentActive = circle.length
    }
    update();
})

prev.addEventListener('click',()=>{
    currentActive--;
    if (currentActive < 1) {
        currentActive = 1
    }
    update()
});

function update(){
    circle.forEach((ele,idx) => {
        if (currentActive > idx) {
            ele.classList.add('active');
        }else{
            ele.classList.remove('active')
        }
    });

    progress.style.width = (((currentActive)-1)/ ((circle.length)-1)*100)+'%'

    if (currentActive === 1) {
        prev.disabled = true
    }else if (currentActive === circle.length) {
        next.disabled = true
    }else{
        prev.disabled = false;
        next.disabled = false;
    }
}