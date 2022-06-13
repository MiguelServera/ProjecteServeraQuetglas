$(function () {
  let audio = window.parent.document.getElementById('audio')
  
  audio.addEventListener('loadedmetadata', function () {
    if (Math.floor(audio.duration % 60) < 10) {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':0' + Math.floor(audio.duration % 60));
    } else {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60));
    }
  });

  $("#songTitle").text(window.parent.document.getElementById('songName').value);
  $(".songImage").attr('src', window.parent.document.getElementById('songPicture').value);
  if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
    $(".buttonPlay").addClass("fa-play");
    $(".buttonPlay").removeClass("fa-pause");
  } else {
    $(".buttonPlay").addClass("fa-pause");
    $(".buttonPlay").removeClass("fa-play");
  }

  $("#playFake").click(function (e) {
    e.preventDefault();
    $("#songTitle").text(window.parent.document.getElementById('songName').value);
    $(".songImage").attr('src', window.parent.document.getElementById('songPicture').value);
    window.parent.document.getElementById('play').click()
    if (Math.floor(audio.duration % 60) < 10) {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':0' + Math.floor(audio.duration % 60));
    } else {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60));
    } if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
      $(".buttonPlay").addClass("fa-play");
      $(".buttonPlay").removeClass("fa-pause");
    } else {
      $(".buttonPlay").addClass("fa-pause");
      $(".buttonPlay").removeClass("fa-play");
    }
  });

  window.parent.document.getElementById('play').onclick = function () {
    $("#songTitle").text(window.parent.document.getElementById('songName').value);
    $(".songImage").attr('src', window.parent.document.getElementById('songPicture').value);
    if (Math.floor(audio.duration % 60) < 10) {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':0' + Math.floor(audio.duration % 60));
    } else {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60));
    }
    if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
      $(".buttonPlay").addClass("fa-play");
      $(".buttonPlay").removeClass("fa-pause");
    } else {
      $(".buttonPlay").addClass("fa-pause");
      $(".buttonPlay").removeClass("fa-play");
    }
  }

  window.parent.document.getElementById('prev').onclick = function () {
    $("#songTitle").text(window.parent.document.getElementById('songName').value);
    $(".songImage").attr('src', window.parent.document.getElementById('songPicture').value);
    if (Math.floor(audio.duration % 60) < 10) {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':0' + Math.floor(audio.duration % 60));
    } else {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60));
    }
    if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
      $(".buttonPlay").addClass("fa-play");
      $(".buttonPlay").removeClass("fa-pause");
    } else {
      $(".buttonPlay").addClass("fa-pause");
      $(".buttonPlay").removeClass("fa-play");
    }
  }

  $("#prevFake").click(function (e) {
    e.preventDefault();
    window.parent.document.getElementById('prev').click()
    if (Math.floor(audio.duration % 60) < 10) {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':0' + Math.floor(audio.duration % 60));
    } else {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60));
    }
    if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
      $(".buttonPlay").addClass("fa-play");
      $(".buttonPlay").removeClass("fa-pause");
    } else {
      $(".buttonPlay").addClass("fa-pause");
      $(".buttonPlay").removeClass("fa-play");
    }
    $("#songTitle").text(window.parent.document.getElementById('songName').value);
    $(".songImage").attr('src', window.parent.document.getElementById('songPicture').value);
  });

  window.parent.document.getElementById('next').onclick = function () {
    $("#songTitle").text(window.parent.document.getElementById('songName').value);
    $(".songImage").attr('src', window.parent.document.getElementById('songPicture').value);
    if (Math.floor(audio.duration % 60) < 10) {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':0' + Math.floor(audio.duration % 60));
    } else {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60));
    }
    if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
      $(".buttonPlay").addClass("fa-play");
      $(".buttonPlay").removeClass("fa-pause");
    } else {
      $(".buttonPlay").addClass("fa-pause");
      $(".buttonPlay").removeClass("fa-play");
    }
  }

  $("#nextFake").click(function (e) {
    e.preventDefault();
    window.parent.document.getElementById('next').click()
    if (Math.floor(audio.duration % 60) < 10) {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':0' + Math.floor(audio.duration % 60));
    } else {
      $("#songDuration").text(Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60));
    }
    if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
      $(".buttonPlay").addClass("fa-play");
      $(".buttonPlay").removeClass("fa-pause");
    } else {
      $(".buttonPlay").addClass("fa-pause");
      $(".buttonPlay").removeClass("fa-play");
    }
    $("#songTitle").text(window.parent.document.getElementById('songName').value);
    $(".songImage").attr('src', window.parent.document.getElementById('songPicture').value);
  });

  let volume = document.querySelector("#volume-control");
  volume.addEventListener("change", function (e) {
    audio.volume = e.currentTarget.value / 100;
  })

  var minsCurr;
  var secsCurr;
  var minsDur;
  var secsDur;
  let seekSlider = document.getElementById("seekslider");

  audio.ontimeupdate = function () {
    minsCurr = Math.floor(audio.currentTime / 60);
    secsCurr = Math.floor(audio.currentTime % 60);
    minsDur = Math.floor(audio.duration / 60);
    secsDur = Math.floor(audio.duration % 60);
    if (secsCurr < 10) {
      secsCurr = '0' + String(secsCurr);
    }

    if (secsDur < 10) {
      secsDur = '0' + String(secsDur);
    }
    $("#currTime").text(minsCurr + ':' + secsCurr);

    seekSlider.max = Math.floor(audio.duration);
    $("#seekslider").val(Math.floor(audio.currentTime));
  }

  $("#seekslider").on('mouseup touchend', function (e) {
    var leftOffset = e.pageX - $(this).offset().left;
    var songPercents = leftOffset / $('#seekslider').width();
    audio.currentTime = songPercents * audio.duration;
    $("#seekslider").val(Math.floor(audio.currentTime));
    var mins = Math.floor(audio.currentTime / 60);
    var secs = Math.floor(audio.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    $("#currTime").text(mins + ':' + secs)
  });
});