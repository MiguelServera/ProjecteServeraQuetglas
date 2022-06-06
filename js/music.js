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
var songsName = [];
var songIndex = 0;
var songsPictures = [];
var artistName = [];
updateSongs();

setInterval(function () {
  updateSongs();
}, 5000);

function updateSongs(){
  $.ajax({
    type: "GET",
    url: "http://stm.projectebaleart.com/public/api/songs",
    dataType: "JSON",
    async: false,
    success: function (response) {
      songs = [];
      songsName = [];
      songsPictures = [];
      response.forEach(element => {
        artistName.push(element['artist']['username']);
        songs.push(element['link']);
        songsName.push(element['name']);
        songsPictures.push(element['song_picture']);
      });
    }
  });
}
// Keep track of song

// Initially load song details into DOM
loadSong(songs[songIndex]);
$("#songName").val(songsName[songIndex]);
$("#songPicture").val(songsPictures[songIndex]);
$("#navSongImage").attr('src', songsPictures[songIndex]);
console.log($("#songName").val());
// Update song details
function loadSong(song) {
  console.log("Canço actual" + song);
  audio.src = song;
  listeningUser();
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  $(".buttonPlay").addClass("fa-pause");
  $(".buttonPlay").removeClass("fa-play");
  listeningUser();
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
  $("#songName").val(songsName[songIndex]);
  $("#songPicture").val(songsPictures[songIndex]);
  $("#navSongImage").attr('src', songsPictures[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  $("#songName").val(songsName[songIndex]);
  $("#songPicture").val(songsPictures[songIndex]);
  $("#navSongImage").attr('src', songsPictures[songIndex]);

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

function listeningUser(){
  $.ajax({
    type: "PUT",
    url: url + "/users/" + userLogged['id_user'] + "/music",
    data: {
      listening_now: "Està escoltant - "+songsName[songIndex]+" - de l'artista "+ artistName[songIndex]
    },
    dataType: "dataType",
    success: function (response) {
      console.log(response);
    }, error: function (response) {
      console.log(response);
    }
});
}