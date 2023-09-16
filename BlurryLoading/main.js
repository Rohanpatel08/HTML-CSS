let perc = document.querySelector('.loading-txt')
let bg = document.querySelector('.bg')


let load = 0

let int = setInterval(loadBlurr, 30)

function loadBlurr(){
    load++;

    if (load>99) {
        clearInterval(int)
    }
    // console.log(load);

    perc.innerText = load + '%'
    perc.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load,0,100,50,0)}px)`
}

const scale = (num, in_min, in_max, out_min, out_max)=>{
    return(num - in_min) * (out_max-out_min) / (in_max - in_min) + out_min;
}