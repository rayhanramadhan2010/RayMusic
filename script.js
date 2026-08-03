/*=========================================
            RAYMUSIC
        SCRIPT.JS
=========================================*/


/*========================
        ELEMENT HTML
========================*/

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const progress = document.getElementById("progress");

const current = document.getElementById("current");

const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

const playBtn = document.getElementById("playBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const shuffleBtn = document.getElementById("shuffleBtn");

const repeatBtn = document.getElementById("repeatBtn");

const searchInput = document.getElementById("searchInput");


/*========================
        DATA LAGU
========================*/

const songs = [

    {
        title: "Firasat",
        artist: "Marcell",
        src: "music/Firasat.mp3",
        cover: "img/Firasat.jpg"
    },

    {
        title: "Dan...",
        artist: "Sheila On 7",
        src: "music/Dan.mp3",
        cover: "img/Dan.jpg"
    },

    {
        title: "love.",
        artist: "wave to earth",
        src: "music/love.mp3",
        cover: "img/love.jpg"
    },

    {
        title: "Dunia Yang Nanti",
        artist: "Raim Laode",
        src: "music/Dunia Yang Nanti.mp3",
        cover: "img/Dunia Yang Nanti.jpg"
    },

    {
        title: "About You",
        artist: "The 1975",
        src: "music/About You.mp3",
        cover: "img/About You.jpg"
    },

    {
        title: "Kasih Putih",
        artist: "Yovie Widianto & Glenn Fredly",
        src: "music/Kasih Putih.mp3",
        cover: "img/Kasih Putih.jpg"
    },

    {
        title: "All Too Well",
        artist: "Taylor Swift",
        src: "music/All Too Well.mp3",
        cover: "img/All Too Well.jpg"
    },
    
    { 
      title:"august",
      artist:"Taylor Swift",
      src:"music/august.mp3",
      cover:"img/august.jpg"
    },  
    
    { 
      title:"Fix You",
      artist:"Coldplay",
      src:"music/Fix You.mp3",
      cover:"img/Fix You.jpg"
    },
      
];


/*========================
        VARIABEL
========================*/

let currentSong = 0;

let isPlaying = false;

let shuffle = false;

let repeat = false;

/*========================
      FORMAT WAKTU
========================*/

function formatTime(seconds){

    const minute = Math.floor(seconds / 60);

    const second = Math.floor(seconds % 60);

    return minute + ":" + String(second).padStart(2,"0");

}


/*========================
        LOAD SONG
========================*/

function loadSong(index){

    const song = songs[index];

    title.textContent = song.title;

    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.src;

}

/*========================
      PLAYLIST
========================*/

function renderPlaylist(){

    playlist.innerHTML="";

    songs.forEach((song,index)=>{

        const item=document.createElement("div");

        item.className="song";

        if(index===currentSong){

            item.classList.add("active");

        }

        item.innerHTML=`

        <img src="${song.cover}">

        <div class="song-info">

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

        </div>

        `;

        item.onclick=()=>{

            currentSong=index;

            loadSong(currentSong);

            playMusic();

            renderPlaylist();

        };

        playlist.appendChild(item);

    });

}

/*========================
        START
========================*/

loadSong(currentSong);

renderPlaylist();

audio.volume=1;

volume.value=1;

/*========================
      PLAY MUSIC
========================*/

function playMusic() {

    audio.play();

    isPlaying = true;

    cover.classList.add("playing");

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

}


/*========================
      PAUSE MUSIC
========================*/

function pauseMusic() {

    audio.pause();

    isPlaying = false;

    cover.classList.remove("playing");

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

}


/*========================
    PLAY / PAUSE BUTTON
========================*/

playBtn.addEventListener("click", () => {

    if (isPlaying) {

        pauseMusic();

    } else {

        playMusic();

    }

});

/*========================
      NEXT SONG
========================*/

function nextSong() {


    if(shuffle){

        let randomSong;

        do{

            randomSong = Math.floor(Math.random()*songs.length);

        }while(randomSong === currentSong);


        currentSong = randomSong;


    }else{


        currentSong++;


        if(currentSong >= songs.length){

            currentSong = 0;

        }

    }


    loadSong(currentSong);

    renderPlaylist();

    playMusic();


}

/*========================
      PREVIOUS SONG
========================*/

function prevSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    renderPlaylist();

    playMusic();

}


nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

/*========================
    DURASI LAGU
========================*/

audio.addEventListener("loadedmetadata", () => {

    progress.max = Math.floor(audio.duration);

    duration.textContent = formatTime(audio.duration);

});


/*========================
    PROGRESS BERJALAN
========================*/

audio.addEventListener("timeupdate", () => {

    progress.value = Math.floor(audio.currentTime);

    current.textContent = formatTime(audio.currentTime);

});


/*========================
    GESER PROGRESS
========================*/

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});

/*========================
        VOLUME
========================*/

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

/*========================
    AUTO NEXT LAGU
========================*/

audio.addEventListener("ended", () => {


    if(repeat){

        audio.currentTime = 0;

        playMusic();


    }else{


        nextSong();


    }


});

/*========================
        SHUFFLE
========================*/

shuffleBtn.addEventListener("click", () => {

    shuffle = !shuffle;

    if(shuffle){

        shuffleBtn.style.background = "#6366f1";

    }else{

        shuffleBtn.style.background = "rgba(255,255,255,.12)";

    }

});


/*========================
        REPEAT
========================*/

repeatBtn.addEventListener("click", () => {

    repeat = !repeat;

    if(repeat){

        repeatBtn.style.background = "#6366f1";

    }else{

        repeatBtn.style.background = "rgba(255,255,255,.12)";

    }

});