const box = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

// checkBoxes();

function checkBoxes(){
    const triggerBottom = window.innerHeight /5 * 4;

    box.forEach(e => {
        const boxTop = e.getBoundingClientRect().top

        if (boxTop < triggerBottom) {
            e.classList.add('show');
        }
        else{
            e.classList.remove('show');
        }
    });
}