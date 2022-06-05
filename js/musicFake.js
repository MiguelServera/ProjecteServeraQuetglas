$(function () {
  if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
    $(".buttonPlay").addClass("fa-play");
    $(".buttonPlay").removeClass("fa-pause");
  } else {
    $(".buttonPlay").addClass("fa-pause");
    $(".buttonPlay").removeClass("fa-play");
  }
  $("#playFake").click(function (e) { 
    e.preventDefault();
    window.parent.document.getElementById('play').click()
    if (window.parent.document.getElementById('buttonPlay').classList.contains("fa-play")) {
      $(".buttonPlay").addClass("fa-play");
      $(".buttonPlay").removeClass("fa-pause");
    } else {
      $(".buttonPlay").addClass("fa-pause");
      $(".buttonPlay").removeClass("fa-play");
    }
  });
  window.parent.document.getElementById('play').onclick = function(){
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
  });

  $("#nextFake").click(function (e) { 
    e.preventDefault();
    window.parent.document.getElementById('next').click()
  });
});