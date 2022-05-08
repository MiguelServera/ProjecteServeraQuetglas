const url = "http://stm.projectebaleart.com/public/api"
let user = "";
let username = "";

if(Cookies.get("user") != undefined)
{
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href="http://localhost/SpotTheMusic/ProjecteServeraQuetglas/login.html";
}

$(function () {
    $(".user").text(username);
    getPosts();
    randomSuggests();
    getFollowersMessages();

    $(".sendPost").click(function (e) { 
        e.preventDefault();
        insertPost();
    });

    let availableFollowers = [

      ];

      $( "#searchFollower" ).autocomplete({
        open : function(){
            $(".ui-autocomplete:visible").css({top:"+=5",left:"-=6"});
        },
        source: availableFollowers
      });

      jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
      }

    $(".followButton").click(function (e) { 
        e.preventDefault();
        
    });
});

function getPosts() {
    $.ajax({
        type: "GET",
        url: url+"/posts/"+user,
        dataType: "json",
        success: function (response) {
            console.log("POSTS");
            console.log(response);
            response.forEach(element => {
                $(".posts").append("<div class='usersPost'>"+
                "<div class='d-flex'>"+
                  "<img class='userIcon mr-2' src='https://randomuser.me/api/portraits/men/47.jpg' alt='' />"+
                  "<div class='userInfo mw-100 w-100'>"+
                    "<div class='name'>"+
                        "<span id='user'>"+element['user']+"</span>"+
                    "</div>"+
                    "<div id='textPost' class='text w-100'>"+
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
            console.log(response);
        }, error: function(response){
            console.log(response);
        }
    });
}

function insertMessage(){
    $.ajax({
        type: "POST",
        url: "url"+"",
        data: {
            "message":$("#textMessage").val(),
            "user":$("#user").val()
        },
        dataType: "json",
        success: function (response) {
            
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

function getFollowersMessages(){
    $.ajax({
        type: "GET",
        url: url+"/followers/"+user,
        dataType: "json",
        success: function (response) {
            console.log(response);
            response.forEach(element => {
                $("#followersMessages").append("<div id='"+element['userFollows']+"' class='followerChat'>"+
                "<div class='d-flex'>"+
                  "<img class='userIcon mr-2' src='img/userIcon.png' alt='' />"+
                  "<div class='userInfo mw-100'>"+
                    "<div class='name'>"+
                      "<span>"+element['userFollows']+"</span>"+
                    "</div>"+
                    "<div class='message'>"+
                      "<span>Oye habla conmigo vamos!</span>"+
                    "</div>"+
                  "</div>"+
                "</div>"+
              "</div>");
            });
            $(".followerChat").click(function (e) { 
                let idFollower = $(this).attr("id");
                $("#chatFollower").modal('show');
                $("#newMessages").modal('hide');
            });
        }
    });
}