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

    var x = document.getElementById("textUbication");

    $('#collapseExample').on('shown.bs.collapse', function () {
        this.scrollIntoView();
    });

    $("#editProfile").click(function (e) {
        e.preventDefault();
        $("#profileModal").modal('show');
    });
    $("#editCategories").click(function (e) {
        e.preventDefault();
        $("#selectCategory").show();
    });

    $("#updateUbication").click(function (e) {
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
            $("#inputUbication").text(position.coords.latitude + "," + position.coords.longitude);
        }
    });

    if (getParamValue("user") != false) {
        let otherUser = getParamValue("user");
        console.log("El otro usuario es" + otherUser);
        $("#editProfile").hide();
        getProfile(otherUser);
        getPosts(otherUser);
        $("#followButton").show();
    } else {
        console.log("El otro usuario es mio" + user);
        getProfile(user);
        getPosts(user);
        $("#followButton").hide();
    }

    $("#logOut").click(function (e) {
        e.preventDefault();
        Cookies.remove("user");
        Cookies.remove("username");
        window.location = "login.html";
    });

    $("#saveProfileButton").click(function (e) {
        e.preventDefault();

        var myFormData = new FormData();
        let files = $("#inputImg")[0].files;
        myFormData.append('picture', files[0]);
        $.ajax({
            type: "POST",
            url: "http://stm.projectebaleart.com/public/api/users/" + user + "/image",
            data: myFormData,
            processData: false,
            contentType: false,
            success: function (response) {
            }, error: function (response) {
            }
        });

        var myFormData2 = new FormData();
        let files2 = $("#inputSong")[0].files;
        myFormData2.append("name", "micancion");
        myFormData2.append("category", "1");
        myFormData2.append("artist", "1");
        myFormData2.append('link', files2[0]);
        $.ajax({
            type: "POST",
            url: "http://stm.projectebaleart.com/public/api/songs",
            data: myFormData2,
            processData: false,
            contentType: false,
            success: function (response) {
            }, error: function (response) {
            }
        });
        $.ajax({
            type: "PUT",
            url: url + "/users/" + user,
            data: {
                name: $("#inputName").val(),
                username: $("#inputUsername").val(),
                location: $("#inputUbication").text(),
                description: $("#inputDescription").text(),
                image: $("#inputImg").val()
            },
            dataType: "dataType",
            success: function (response) {
            }, error: function (response) {
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
                        "<img class='userIcon mr-2' src='" + element['user']['picture'] + "' alt='' />" +
                        "<div class='userInfo mw-100 w-100'>" +
                        "<div class='name'>" +
                        "<span id='user'>" + element['user']['username'] + "</span>" +
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
        }
    });
}

function getProfile(userP) {
    console.log("Helloooooo");
    $.ajax({
        type: "GET",
        url: url + "/users/" + userP,
        dataType: "json",
        success: function (response) {
            console.log("ha entrao");
            console.log(response);
            $(".profileImg").attr("src", response['picture']);
            $("#inputName").val(response['name']);
            $("#inputUsername").val(response['username']);
            $("#inputEmail").val(response['email']);
            if (response['location'] != null) {
                let location = response['location'];
                let textUbication = "Location: </br>- " + location.substr(0, location.indexOf(',')) + "</br>- " + location.substr(location.indexOf(',') + 1);
                $("#textUbication").html(textUbication);
            }
            $("#inputEmail").val(response['email']);
            $("#inputDescription").text(response['description']);
            $("#nameProfile").text(response['name']);
            $("#usernameProfile").text(response['username']);
            $("#descriptionProfile").text(response['description']);
        },
        error: function (response) {
            console.log("ha entrao pos no");
            console.log(response);
        }
    });
}

function getParamValue(paramName) {
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    for (var i = 0; i < qArray.length; i++) {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName) {
            return pArr[1]; //return value
        } else {
            return false;
        }
    }
}