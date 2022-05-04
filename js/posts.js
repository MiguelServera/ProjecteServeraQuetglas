const url = "http://stm.projectebaleart.com/public/api"
let user = "";

/*(Cookies.get("user") != undefined)
?user = Cookies.get("user")
:window.location.href="http://localhost/SpotTheMusic/ProjecteServeraQuetglas/";*/

$(function () {
    getPosts();
    randomSuggests();
    $(".sendPost").click(function (e) { 
        e.preventDefault();
        insertPost();
    });

    let availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C ++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Maravilloso",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Esquema"
      ];

      $( "#searchFollower" ).autocomplete({
        open : function(){
            $(".ui-autocomplete:visible").css({top:"+=5",left:"-=6"});
        },
        source: availableTags
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
        url: url+"/posts/8",
        dataType: "json",
        success: function (response) {
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
            "user":8
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
            "userFollows":8,
            "userFollowed":parent
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