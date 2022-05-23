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

    if (getUrlParameter("user") != false) {
        let otherUser = getUrlParameter("user");
        $("#editProfile").hide();
        getProfile(otherUser);
        getPosts(otherUser);
        $("#followButton").show();
    } else {
        getProfile(user);
        getPosts(user);
        $("#followButton").hide();
    }

    $("#logOut").click(function (e) { 
        e.preventDefault();
        Cookies.remove("user");
        Cookies.remove("username");
        window.location = "http://localhost/ProjecteServeraQuetglas/login.html";
    });

    $("#saveProfileButton").click(function (e) { 
        e.preventDefault();

        var myFormData = new FormData();
        let files = $("#inputImg")[0].files;
        myFormData.append('picture', files[0]);
        $.ajax({
            type: "POST",
            url: "http://stm.projectebaleart.com/public/api/users/"+user+"/image",
            data: myFormData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
            }, error: function (response){
                console.log(response);
            }
        });
    });
});

function getPosts(userP) {
    $.ajax({
        type: "GET",
        url: url + "/posts/" + userP,
        dataType: "json",
        success: function (response) {
            console.log("POSTS");
            console.log(response);
            $(".usersPost").remove();
            if (response.length == 0) {
                $("#profilePosts").addClass("d-flex");
                $("#profilePosts").html("<h3 id='warningPostsProfile' class='d-flex w-100 text-center flex-column justify-content-center align-items-center'>THIS USER DOESN'T HAVE ANY POSTS YET</h3>");
            } else {
                $("#profilePosts").removeClass("d-flex");
                $("#warningPostsProfile").remove();
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
            }
            
        },
        error: function (response) {
            console.log(response);
        }
    });
}

function getProfile(userP){
    console.log("Hello");

    $.ajax({
        type: "GET",
        url: url + "/users/" + userP,
        dataType: "json",
        success: function (response) {
            console.log("Hello");
            console.log(response);
            $("#profileImg").attr("src",response['picture']);
            $("#inputName").val(response['name']);
            $("#inputUsername").val(response['username']);
            $("#inputEmail").val(response['email']);
            if (response['location'] != null) {
                let location = response['location'];
                let textUbication = "Location: </br>- "+location.substr(0, location.indexOf(','))+"</br>- "+location.substr(location.indexOf(',')+1);
                $("#textUbication").html(textUbication);
            }
            $("#inputEmail").val(response['email']);
            $("#inputDescription").text(response['description']);
            $("#nameProfile").text(response['name']);
            $("#usernameProfile").text(response['username']);
            $("#descriptionProfile").text(response['description']);
        },
        error: function (response) {
            console.log(response);
        }
    });
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};