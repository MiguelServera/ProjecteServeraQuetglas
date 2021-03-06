const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const stopBtn = document.getElementById('stop');

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
$(function () {
  if ($(".hideMob").is(":hidden")) {
    $(".hideMob").remove();
    window.parent.document.getElementById('navPc').remove();
  }
  updateSongs();
  $("#songName").val(songsName[songIndex]);
  $("#songPicture").val(songsPictures[songIndex]);
  $("#navSongImage").attr('src', songsPictures[songIndex]);
  setInterval(function () {
    updateSongs();
  }, 5000);

  loadSong(songs[songIndex]);
});

function updateSongs() {
  $.ajax({
    type: "GET",
    url: "http://stm.projectebaleart.com/public/api/songs",
    headers: { Authorization: 'Bearer ' + userLogged.token },
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
    },
    error: function (response) {
      if (response.status == 401) {
                window.top.location.href = "index.html";
      }
    }
  });
}
// Update song details
function loadSong(song) {
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

function stopSong(){
  audio.pause();
  audio.currentTime = 0;
  musicContainer.classList.remove('play');
  $(".buttonPlay").addClass("fa-play");
  $(".buttonPlay").removeClass("fa-pause");
}
// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
stopBtn.addEventListener('click', stopSong);
// Song ends
audio.addEventListener('ended', nextSong);

function listeningUser() {
  $.ajax({
    type: "PUT",
    url: url + "/users/" + userLogged.id_user + "/music",
    headers: { Authorization: 'Bearer ' + userLogged.token },
    data: {
      listening_now: "Est?? escoltant - " + songsName[songIndex] + " - de l'artista " + artistName[songIndex]
    },
    dataType: "dataType",
    success: function (response) {
    }, error: function (response) {
    }
  });
}