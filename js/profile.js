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
    getPosts();
    $('#collapseExample').on('shown.bs.collapse', function () {
        this.scrollIntoView();
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
            $(".usersPost").remove();
            response.forEach(element => {
                $("#profilePosts").append("<div class='usersPost'>"+
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