const musicContainer = document.getElementById('music_container');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');

const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 0;

loadSong(songs[songIndex])

function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`
    cover.src = `imgs/${song}.jpg`;
}

playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play');

    if (!isPlaying) {
        musicContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');

        audio.play();
    }else{
        musicContainer.classList.remove('play');
        playBtn.querySelector('i.fas').classList.remove('fa-pause');
        playBtn.querySelector('i.fas').classList.add('fa-play');

        audio.pause();
    }
})


prevBtn.addEventListener('click',()=>{
    songIndex--;
    
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    musicContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');

        audio.play();
})

nextBtn.addEventListener('click',()=>{
    songIndex++;
    
    if (songIndex > 2) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
})

audio.addEventListener('timeupdate',(e)=>{
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
})

progressContainer.addEventListener('click', (e)=>{
    const width = progressContainer.clientWidth;
    let clickX = e.offsetX;
    let duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
})

audio.addEventListener('ended', ()=>{
    songIndex++;
    
    if (songIndex > 2) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
})