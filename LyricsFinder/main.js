const search = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')
const form = document.getElementById('form')


async function searchSongs(term) {
    let res = await fetch(`https://api.lyrics.ovh/suggest/${term}`)
    let data = await res.json();
    console.log(data);
    showData(data);
}

function showData(data) {
    // let output = '';

    // data.data.forEach(song => {
    //     output += `
    //         <li>
    //             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    //             <button class='btn' data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    //         </li>
    //     `   
    // });

    // result.innerHTML = `
    //     <ul class='songs'>
    //         ${output}
    //     </ul>    
    // `;

    result.innerHTML = `
    <ul class='songs'>
        ${data.data
            .map(song =>`
                <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class='btn' data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                </li>
                `
            ).join('')
        }
    </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev? `<button class="btn" onclick="getPrevSongs('${data.prev}')">Prev</button>`:''}
            ${data.next? `<button class="btn" onclick="getPrevSongs('${data.next}')">Next</button>`:''}
        `;
    }else{
        more.innerHTML = '';
    }
}

async function getPrevSongs(url){
    console.log(url);
    let res = await fetch(`https://thingproxy.freeboard.io/fetch/${url}`)
    let data = await res.json();
    console.log(data);
    showData(data);
}   

async function getLyrics(artist, songTitle){
    let res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
    let data = await res.json();
    const lyric = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyric}</span>
    `;

    more.innerHTML = '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = search.value.trim();
    if (!searchTerm) {
        alert('Enter valid name...')
    } else {
        searchSongs(searchTerm)
    }
})

result.addEventListener('click',(e)=>{
    const clickedEl = e.target;

    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
})