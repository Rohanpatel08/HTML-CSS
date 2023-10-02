const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getData(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    let data = await res.json();
    console.log(data);

    data.forEach(post => {
        let postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML =`
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        `;
        postContainer.appendChild(postEl);
    });
    
}

//Show loader and More posts
function showLoading(){
    loading.classList.add('show');
    
    setTimeout(()=>{
        loading.classList.remove('show');

        setTimeout(()=>{
            page++;
            getData();
        },300)
    },1000)
}

getData();

window.addEventListener('scroll',()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight >=scrollHeight -5) {
        showLoading();
    }
})

filter.addEventListener('input', (e)=>{
    let search = e.target.value.toUpperCase();
    let posts = document.querySelectorAll('.post');

    posts.forEach((post)=>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
            post.style.display = 'flex';
        }else{
            post.style.display = 'none';
        }
    })
})