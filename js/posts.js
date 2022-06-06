let user = "";
let username = "";

if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href = "login.html";
}

$(function () {
    
    $("#navUserImg").attr('src', userLogged.picture);

    $(".user").text(username);
    getPosts();
    randomSuggests();

    $(".sendPost").click(function (e) {
        e.preventDefault();
        insertPost();
    });
});

function getPosts() {
    console.log(userLogged.token);
    $.ajax({
        type: "GET",
        url: url + "/posts/" + user + "/follows",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        dataType: "json",
        success: function (response) {
            if (response.status != 0) {
                $(".usersPost").remove();
                response.forEach(element => {
                    $(".posts").append("<div id='"+element['id_post']+"' class='usersPost'>" +
                        "<div class='d-flex'>" +
                        "<img class='userIcon mr-2' src='"+element['user']['picture']+"' alt='' />" +
                        "<div class='userInfo mw-100 w-100'>" +
                        "<div class='name'>" +
                        "<span id='user'>" + element['user']['username'] + "</span>" +
                        "</div>" +
                        "<div class='text w-100'>" +
                        "<span>" + element['text'] + "</span>" +
                        "</div>" +
                        "<div class='text w-100'>" +
                        "<span class='text-center ml-3 mr-3 col-3'><i role='button' class='musicFav fas fa-music'></i> 0 </span>" +
                        "<span class='text-center ml-3 mr-3 col-3'><i role='button' class='retweet fa fa-retweet'></i> 0 </span>" +
                        "<span class='text-center ml-3 mr-3 col-3'><i role='button' class='like far fa-heart'></i> "+element['likes']+" </span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                });
            }
            $(".like").click(function (e) { 
                e.preventDefault();
                let id_post = $(this).closest('.usersPost').attr('id');
                $.ajax({
                    type: "GET",
                    url: url+"/posts/like/"+id_post+"/"+user,
                    dataType: "json",
                    success: function (response) {
                        getPosts();
                    }
                });
            });
        },
        error: function (response) {
            console.log("POSTTTSS"+response);
        }
    });
}

function insertPost() {
    $.ajax({
        type: "POST",
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
        }
    });
}

function followUser(parent) {
    $.ajax({
        type: "POST",
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
        url: url + "/followers",
        data: {
            "userFollows": parent,
            "userFollowed": user
        },
        dataType: "json",
        success: function (response) {
        }
    });
}

function randomSuggests() {
    $.ajax({
        type: "GET",
        url: url + "/followers/" + user + "/new",
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
                    "<img class='userIcon mr-2' src='"+element['picture']+"' alt='' />" +
                    "<div class='userInfo mw-100'>" +
                    "<div class='name'>" +
                    "<span>" + element['username'] + "</span>" +
                    "</div>" +
                    "<div class='description'>" +
                    "<span>" + element['email'] + "</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<button type='button' class='btn btn-primary followButton'>Follow</button></div>");
            });
            $(".suggestion").hide();
            $(".suggestion").fadeIn();
            $(".followButton").one("click", function (e) {
                let parent = $(this).parent().attr("id");
                followUser(parent);
            });
        }, error: function (response) {
        }
    });
}