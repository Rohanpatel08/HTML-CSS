const toggle = document.getElementById('toggle')
const clos = document.getElementById('close')
const opan = document.getElementById('open')
const model = document.getElementById('model')


toggle.addEventListener('click',()=>{
    document.body.classList.toggle('show-nav')
})

opan.addEventListener('click',()=>{
    model.classList.add('show-model');
})

clos.addEventListener('click', ()=>{
    model.classList.remove('show-model');
})

window.addEventListener('click', (e)=>{
    e.target == model ? model.classList.remove('show-model'): false
})