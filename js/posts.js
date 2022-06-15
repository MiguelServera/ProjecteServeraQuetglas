let user = "";
let username = "";
var check1, check2, check3 = false;

if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
            window.top.location.href = "index.html";
}

$(function () {
    const swiper = document.querySelector('.swiper').swiper;
    swiper.slideTo(1);
    $("#navUserImg").attr('src', userLogged.picture);
    $(".myUserIcon").attr('src', userLogged.picture);
    window.parent.document.getElementById('navUserImg').src = userLogged.picture;

    $(".user").text(username);
    getPosts();
    randomSuggests();
    $(".sendPost").click(function (e) {
        e.preventDefault();
        insertPost();
    });

    setInterval(() => {
        //getPosts()
    }, 10000);
});

function getPosts() {
    $.ajax({
        type: "GET",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/posts/" + user + "/follows",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        dataType: "json",
        success: function (response) {
            if (response.status != 0) {
                $(".usersPost").remove();
                response.forEach(element => {
                    $(".posts").append("<div role='button' id='" + element['id_post'] + "' class='usersPost'>" +
                        "<div class='d-flex'>" +
                        "<img class='userIcon mr-2' src='" + element['user']['picture'] + "' alt='' />" +
                        "<div class='userInfo mw-100 w-100'>" +
                        "<div class='name'>" +
                        "<span id='" + element['user']['id_user'] + "'>" + element['user']['username'] + "</span>" +
                        "</div>" +
                        "<div class='text w-100'>" +
                        "<span>" + element['text'] + "</span>" +
                        "</div>" +
                        "<div class='text w-100 d-flex'>" +
                        "<span class='text-center ml-1 mr-1 col-6'><i role='button' class='rePost fa fa-retweet'></i> " + element['spots'] + " </span>" +
                        "<span class='text-center ml-1 mr-1 col-6'><i role='button' class='like far fa-heart'></i> " + element['likes'] + " </span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                });
                $(".usersPost").click(function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    let idUserClicked = $(this).find('.name').find('span').attr("id");
                    window.parent.document.getElementById('contenedor').src = 'profile.html?user=' + idUserClicked;
                });
            }
            $(".like").click(function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                let id_post = $(this).closest('.usersPost').attr('id');
                $.ajax({
                    type: "GET",
                    headers: { Authorization: 'Bearer ' + userLogged.token },
                    url: url + "/posts/like/" + id_post + "/" + user,
                    dataType: "json",
                    success: function (response) {
                        getPosts();
                    }
                });
            });


            $(".rePost").click(function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                let id_post = $(this).closest('.usersPost').attr('id');
                $.ajax({
                    type: "GET",
                    headers: { Authorization: 'Bearer ' + userLogged.token },
                    url: url + "/posts/spot/" + id_post + "/" + user,
                    dataType: "json",
                    success: function (response) {
                        getPosts();
                    }
                });
            });
            check1 = true;
            checkChecks();
        },
        error: function (response) {
          if (response.status == 401) {
                    window.top.location.href = "index.html";
          }
        }
    });
}

function insertPost() {
    $.ajax({
        type: "POST",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/posts",
        data: {
            "text": $("#textPost").text(),
            "user": user
        },
        dataType: "json",
        success: function (response) {
            getPosts();
        },
        error: function (response) {
          if (response.status == 0) {
                    window.top.location.href = "index.html";
          }
        }
    });
}

function followUser(parent) {
    $.ajax({
        type: "POST",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/followers",
        data: {
            "userFollows": user,
            "userFollowed": parent
        },
        dataType: "json",
        success: function (response) {
            randomSuggests();
        }
    });
}

function deleteFollowUser(parent) {
    $.ajax({
        type: "DELETE",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/followers",
        data: {
            "userFollows": parent,
            "userFollowed": user
        },
        dataType: "json",
        success: function (response) {
        },
        error: function (response) {
          if (response.status == 0) {
                    window.top.location.href = "index.html";
          }
        }
    });
}

function randomSuggests() {
    $.ajax({
        type: "GET",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/followers/" + userLogged.id_user + "/new",
        dataType: "json",
        success: function (response) {
            $(".suggestion").remove();
            if (response.length == 0) {
                $("#suggested").hide();
                $(".messsages").removeClass("col-3");
                $(".messsages").addClass("col-4");
                $(".posts").removeClass("col-6");
                $(".posts").addClass("col-8");
            }
            response.forEach(element => {
                $(".suggested").append("<div id='" + element['id_user'] + "' class='suggestion'>" +
                    "<div class='d-flex'>" +
                    "<img class='userIcon mr-2' src='" + element['picture'] + "' alt='' />" +
                    "<div class='userInfo mw-100'>" +
                    "<div class='name'>" +
                    "<span id='" + element['id_user'] + "'>" + element['username'] + "</span>" +
                    "</div>" +
                    "<div class='description'>" +
                    "<span>" + element['email'] + "</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<button type='button' class='btn btn-primary followButton'>Seguir</button></div>");
            });
            $(".suggestion").hide();
            $(".suggestion").fadeIn();
            $(".followButton").one("click", function (e) {
                let parent = $(this).parent().attr("id");
                followUser(parent);
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

function checkChecks() {
    if (check1 == true && check2 == true && check3 == true) {
        $(".spinnerContainer").fadeOut();
        $(".spinnerContainer").removeClass("d-flex");
        $(".spinnerMusic").hide();
        $(".main-container").fadeIn(1000);
    }
}