const url = "http://stm.projectebaleart.com/public/api"
let user = "";
let username = "";

if(Cookies.get("user") != undefined)
{
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href="http://localhost/ProjecteServeraQuetglas/login.html";
}

$(function () {

    $(".user").text(username);
    getPosts();
    randomSuggests();

    $(".sendPost").click(function (e) { 
        e.preventDefault();
        insertPost();
    });

    $(".followButton").click(function (e) { 
        e.preventDefault();
    });
});

function getPosts() {
    $.ajax({
        type: "GET",
        url: url+"/posts/"+user+"/follows",
        dataType: "json",
        success: function (response) {
            console.log("POSTS");
            console.log(response);
            $(".usersPost").remove();
            response.forEach(element => {
                $(".posts").append("<div class='usersPost'>"+
                "<div class='d-flex'>"+
                  "<img class='userIcon mr-2' src='https://randomuser.me/api/portraits/men/47.jpg' alt='' />"+
                  "<div class='userInfo mw-100 w-100'>"+
                    "<div class='name'>"+
                        "<span id='user'>"+element['user']+"</span>"+
                    "</div>"+
                    "<div class='text w-100'>"+
                        "<span>"+element['text']+"</span>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
                "</div>");
            });
        }, error: function(response){
            console.log(response);
        }
    });
}

function insertPost(){
    console.log($("#textPost").text());
    $.ajax({
        type: "POST",
        url: url+"/posts",
        data: {
            "text":$("#textPost").text(),
            "user":user
        },
        dataType: "json",
        success: function (response) {
            getPosts();
            console.log(response);
        }, error: function(response){
            console.log(response);
        }
    });
}

function followUser(parent){
    $.ajax({
        type: "POST",
        url: url+"/followers",
        data: {
            "userFollows":parent,
            "userFollowed":user
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
}

function deleteFollowUser(parent){
    $.ajax({
        type: "DELETE",
        url: url+"/followers",
        data: {
            "userFollows":parent,
            "userFollowed":user
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
}

function randomSuggests(){
    $.ajax({
        type: "GET",
        url: url+"/users",
        dataType: "json",
        success: function (response) {
            console.log(response);
            response.forEach(element => {
                $(".suggested").append("<div id='"+element['id_user']+"' class='suggestion'>"+
                "<div class='d-flex'>"+
                    "<img class='userIcon mr-2' src='img/userIcon.png' alt='' />"+
                    "<div class='userInfo mw-100'>"+
                        "<div class='name'>"+
                            "<span>"+element['username']+"</span>"+
                        "</div>"+
                        "<div class='description'>"+
                            "<span>"+element['email']+"</span>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
                "<button type='button' class='btn btn-primary followButton'>Follow</button></div>");
            });
            $(".followButton").click(function (e) { 
                let parent = $(this).parent().attr("id");
                followUser(parent);
            });
        }
    });
}