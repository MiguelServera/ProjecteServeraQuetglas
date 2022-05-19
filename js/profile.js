const url = "http://stm.projectebaleart.com/public/api"
let user = "";
let username = "";

if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href = "http://localhost/ProjecteServeraQuetglas/login.html";
}

$(function () {
    var x = document.getElementById("textUbication");

    $('#collapseExample').on('shown.bs.collapse', function () {
        this.scrollIntoView();
    });

    $("#editProfile").click(function (e) {
        e.preventDefault();
        $("#profileModal").modal('show');
    });

    $("#updateUbication").click(function (e) {
        console.log("hola");
        e.preventDefault();
        getLocation();
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML += "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            x.innerHTML += "- Latitude: " + position.coords.latitude +
                "<br>- Longitude: " + position.coords.longitude;
            $("#inputUbication").text(position.coords.latitude +","+ position.coords.longitude);
            console.log($("#inputUbication").val());
        }
    });

    getPosts();
    getProfile();

    $("#logOut").click(function (e) { 
        e.preventDefault();
        Cookies.remove("user");
        Cookies.remove("username");
        window.location = "http://localhost/ProjecteServeraQuetglas/login.html";
    });

    $("#saveProfileButton").click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "PUT",
            url: url+"/users/"+user,
            data: {
                name: $("#inputName").val(),
                username: $("#inputUsername").val(),
                location: $("#inputUbication").text(),
                email: $("#inputEmail").val(),
                description: $("#inputDescription").text()
            },
            dataType: "dataType",
            success: function (response) {
                console.log(response);
            }, error: function (response){
                console.log("error");
                console.log(response);
            }
        });
    });
});

function getPosts() {
    $.ajax({
        type: "GET",
        url: url + "/posts/" + user,
        dataType: "json",
        success: function (response) {
            console.log("POSTS");
            console.log(response);
            $(".usersPost").remove();
            response.forEach(element => {
                $("#profilePosts").append("<div class='usersPost'>" +
                    "<div class='d-flex'>" +
                    "<img class='userIcon mr-2' src='https://randomuser.me/api/portraits/men/47.jpg' alt='' />" +
                    "<div class='userInfo mw-100 w-100'>" +
                    "<div class='name'>" +
                    "<span id='user'>" + element['user'] + "</span>" +
                    "</div>" +
                    "<div class='text w-100'>" +
                    "<span>" + element['text'] + "</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>");
            });
        },
        error: function (response) {
            console.log(response);
        }
    });
}

function getProfile(){
    console.log("Hello");
    $.ajax({
        type: "GET",
        url: url + "/users/" + user,
        dataType: "json",
        success: function (response) {
            console.log("Hello");
            console.log(response);
            $("#inputName").val(response['name']);
            $("#inputUsername").val(response['username']);
            let location = response['location'];
            let textUbication = "Location: </br>- "+location.substr(0, location.indexOf(','))+"</br>- "+location.substr(location.indexOf(',')+1);
            console.log(textUbication);
            $("#textUbication").html(textUbication);
            $("#inputEmail").val(response['email']);
            $("#inputDescription").text(response['description']);
        },
        error: function (response) {
            console.log(response);
        }
    });
}