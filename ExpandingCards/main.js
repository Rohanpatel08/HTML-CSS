let imgs = document.querySelectorAll('.img');

imgs.forEach(img => {
    img.addEventListener('click',()=>{
        removeActiveClass();
        img.classList.add('active')
    })
})

function removeActiveClass(){
    imgs.forEach(img => {
        img.classList.remove('active')
    });
}