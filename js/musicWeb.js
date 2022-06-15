var check1, check2 = false;
$(function () {
    getFollowersMusic();
    setInterval(() => {
        getFollowersMusic();
    }, 8000);

    getSongsList();

    setInterval(() => {
        getSongsList();
    }, 8000);
});

function getFollowersMusic(){
    $.ajax({
        type: "GET",        
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: "http://stm.projectebaleart.com/public/api/followers/"+userLogged['id_user']+"/follows",
        dataType: "json",
        success: function (response) {
            $(".followersMusic").empty();
            response.forEach(element => {
                $(".followersMusic").append("<div class='m-2'>" +
                "<img class='userIcon' src='" + element['picture'] + "' alt='' />" +
                "<div class='userInfoMusic mw-100'>" +
                "<div class='name'>" +
                "<input id='" + element['id_user'] + "' type='hidden' name=''>" +
                "<span>" + element['username'] + "</span>" +
                "</div>" +
                "<div class='description'>" +
                "<span>"+element['listening_now']+"</span>" +
                "</div>" +
                "</div>" +
                "</div>");
                check1 = true;
                checkChecks(); 
            });
        },
        error: function (response) {
          if (response.status == 401) {
                    window.top.location.href = "index.html";
          }
        }
    });
}

function getSongsList(){
    $.ajax({
        type: "GET",
        url: "http://stm.projectebaleart.com/public/api/songs",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        dataType: "json",
        success: function (response) {
            $(".songsList").html("");
            response.forEach(element => {
                $(".songsList").append("<div role='button' style='cursor: pointer;' id='" + element['link'] + "' class='songIndividual m-2 d-flex align-items-center col-12 flex-column justify-content-center text-center'>" +
                "<img class='userIcon' src='" + element['song_picture'] + "' alt='' />" +
                "<div class='userInfoMusic mw-100'>" +
                "<div class='name'>" +
                "<span>Artista: " + element['artist']['username'] + "</span>" +
                "</div>" +
                "<div class='description'>" +
                "<p>"+element['name']+"</p>" +
                "</div>" +
                "</div>" +
                "</div>");
            });
            $(".songIndividual").click(function (e) { 
                e.preventDefault();
                window.parent.document.getElementById('audio').src = $(this).attr("id");
                    window.parent.document.getElementById('audio').play();
                    window.parent.document.getElementById('navSongImage').src = $(this).find('.userIcon').attr("src");
                    window.parent.document.getElementById('songPicture').value = $(this).find('.userIcon').attr("src");
                    window.parent.document.getElementById('songName').value = $(this).find('.description').find('p').text();
                    window.parent.document.getElementById('buttonPlay').classList.remove("fa-play");
                    window.parent.document.getElementById('buttonPlay').classList.add("fa-pause");
                    window.parent.document.getElementById('music-container').classList.add('play');  
                    $(".buttonPlay").removeClass("fa-play");
                    $(".buttonPlay").addClass("fa-pause");
                    let name = $(this).find('.description').find('p').text();
                    $("#songTitle").text(name);
                    $(".songImage").attr('src', $(this).find('.userIcon').attr("src"));
            });
            check2 = true;
            checkChecks();
        },
        error: function (response) {
          if (response.status == 401) {
                    window.top.location.href = "index.html";
          }
        }
    });
}

function checkChecks(){
    if (check1 == true && check2 == true) {
      $(".spinnerContainer").fadeOut();
      $(".spinnerContainer").removeClass("d-flex");
      $(".spinnerMusic").hide();
      $(".main-container").fadeIn(1000);
    }
}