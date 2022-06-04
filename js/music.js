const musicContainer = document.getElementById('music-container');  
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
//const progress = document.getElementById('progress');
//const progressContainer = document.getElementById('progress-container');
//const title = document.getElementById('title');
//const cover = document.getElementById('cover');
//const currTime = document.querySelector('#currTime');
//const durTime = document.querySelector('#durTime');
var songs = [];

$.ajax({
  type: "GET",
  url: "http://stm.projectebaleart.com/public/api/songs",
  dataType: "JSON",
  async: false,
  success: function (response) {
    response.forEach(element => {
      songs.push(element['link']);
    });
  }
});

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  console.log("Canço actual" + song);
  audio.src = song;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  $(".buttonPlay").addClass("fa-pause");
  $(".buttonPlay").removeClass("fa-play");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  $(".buttonPlay").addClass("fa-play");
  $(".buttonPlay").removeClass("fa-pause");
  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Song ends
audio.addEventListener('ended', nextSong);