let user = "";
let username = "";
let allowLocation = 0;

if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href = "main.html";
}

$(function () {
    $("#followButton").click(function (e) {
        e.preventDefault();
        if ($("#followButton").hasClass("btn-danger")) {
            deleteFollowUser();
        } else {
            followUser();
        }
    });

    $("#selectCategory").hide();

    $("#navUserImg").attr('src', userLogged.picture);

    var x = document.getElementById("textUbication");

    $('#collapseExample').on('shown.bs.collapse', function () {
        this.scrollIntoView();
    });

    $("#editProfile").click(function (e) {
        e.preventDefault();
        $("#profileModal").modal('show');
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
            x.innerHTML = "";
            x.innerHTML += "Location: </br> - Latitude: " + position.coords.latitude +
                "<br>- Longitude: " + position.coords.longitude;
            $("#inputUbication").text(position.coords.latitude + "," + position.coords.longitude);
        }

    });

    if (getParamValue("user") != false) {
        var otherUser = getParamValue("user");
        checkUser();
        $("#editProfile").hide();
        $("#editCategories").hide();
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
        window.location = "main.html";
    });

    function checkUser() {
        $.ajax({
            type: "GET",
            headers: { Authorization: 'Bearer ' + userLogged.token },
            url: url + "/followers/" + user + "/" + otherUser,
            dataType: "json",
            success: function (response) {
                if (response.length != 0) {
                    $("#followButton").removeClass("btn-primary");
                    $("#followButton").addClass("btn-danger");
                    $("#followButton").text("Unfollow");
                } else {
                    $("#followButton").addClass("btn-primary");
                    $("#followButton").removeClass("btn-danger");
                    $("#followButton").text("Follow");

                }
            }, error: function (response) {
            }
        });
    }

    function followUser() {
        $.ajax({
            type: "POST",
            headers: { Authorization: 'Bearer ' + userLogged.token },
            url: url + "/followers",
            data: {
                "userFollows": userLogged.id_user,
                "userFollowed": otherUser
            },
            dataType: "json",
            success: function (response) {
                checkUser();
                getProfile(otherUser);
            }
        });
    }

    function deleteFollowUser() {
        $.ajax({
            type: "DELETE",
            headers: { Authorization: 'Bearer ' + userLogged.token },

            url: url + "/followers/" + user + "/" + otherUser,
            dataType: "json",
            success: function (response) {
                checkUser();
                getProfile(otherUser);
            }
        });
    }

    $("#saveProfileButton").click(function (e) {
        e.preventDefault();
        if ($('#inputImg').get(0).files.length !== 0) {
            var myFormData = new FormData();
            let files = $("#inputImg")[0].files;
            myFormData.append('picture', files[0]);
            $.ajax({
                type: "POST",
                headers: { Authorization: 'Bearer ' + userLogged.token },
                url: "http://stm.projectebaleart.com/public/api/users/" + user + "/image",
                data: myFormData,
                processData: false,
                contentType: false,
                success: function (response) {
                }, error: function (response) {
                }
            });
        } else {
        }

        $('.radioAllow').each(function (indexInArray, valueOfElement) {
            if ($(this).is(':checked')) {
                allowLocation = $(this).val();
                return false;
            } else {
                allowLocation = 0;
            }
        });

        $.ajax({
            type: "PUT",
            headers: { Authorization: 'Bearer ' + userLogged.token },
            url: url + "/users/" + user,
            data: {
                name: $("#inputName").val(),
                username: $("#inputUsername").val(),
                location: $("#inputUbication").text(),
                description: $("#inputDescription").text(),
                allowLocation: allowLocation
            },
            dataType: "dataType",
            success: function (response) {
            }, error: function (response) {
            }
        });

        getProfile(user);
    });

    $("#editCategories").click(function (e) {
        e.preventDefault();
        $("#selectCategory").toggle(500, function () {
        });
    });

    getCategories();

    $("#addCategory").click(function (e) {
        e.preventDefault();
        if ($("#filterCategories").val() != "") {
            addCategory($("#filterCategories").val());
        }
    });

    $("#filterCategories").change(function (e) {
        e.preventDefault();
        if ($("#categoriesProfile").text().includes($("#filterCategories option:selected").text())) {
            $("#addCategory").removeClass("btn-secondary");
            $("#addCategory").addClass("btn-danger");
            $("#addCategory").text("Remove");
        } else {
            $("#addCategory").addClass("btn-secondary");
            $("#addCategory").removeClass("btn-danger");
            $("#addCategory").text("Add");
        }
    });

    $("#saveSongButton").click(function (e) {
        var myFormData2 = new FormData();
        let files2 = $("#inputSong")[0].files;
        let files2img = $("#songImg")[0].files;
        myFormData2.append("name", $("#songName").val());
        myFormData2.append("category", $("#songCategories").val());
        myFormData2.append("artist", user);
        myFormData2.append('link', files2[0]);
        if (!files2img.length || files2img === 'undefined') {
            myFormData2.append('song_picture', "");
        } else {
            myFormData2.append('song_picture', files2img[0]);
        }
        $.ajax({
            type: "POST",
            headers: { Authorization: 'Bearer ' + userLogged.token },
            url: "http://stm.projectebaleart.com/public/api/songs",
            data: myFormData2,
            processData: false,
            contentType: false,
            success: function (response) {
            }, error: function (response) {
            }
        });
    });

    $("#uploadSong").click(function (e) {
        $("#songModal").modal('show');
    });
});

function addCategory(category) {
    $.ajax({
        type: "GET",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/categories/user/" + user + "/" + category,
        dataType: "json",
        success: function (response) {
            getUserCategory();
        }, error: function (response) {
        }
    });
}

function getUserCategory() {
    $.ajax({
        type: "GET",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/categories/" + user,
        dataType: "json",
        success: function (response) {
            let string = ""
            if (response.result !== null) {
                response.result.forEach(element => {
                    string += element["name"] + " - ";
                });
                string = string.slice(0, -2);
                document.getElementById('categoriesProfile').innerHTML = string;
                if ($("#categoriesProfile").text().includes($("#filterCategories option:selected").text())) {
                    $("#addCategory").removeClass("btn-secondary");
                    $("#addCategory").addClass("btn-danger");
                    $("#addCategory").text("Remove");
                } else {
                    $("#addCategory").addClass("btn-secondary");
                    $("#addCategory").removeClass("btn-danger");
                    $("#addCategory").text("Add");
                }
            }
        }, error: function (response) {
        }
    });
}

function getCategories() {
    $.ajax({
        type: "GET",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/categories",
        dataType: "json",
        success: function (response) {
            response.forEach(element => {
                $(".filterCategories").append("<option value='" + element['id_category'] + "'>" + element['name'] + "</option>");
            });
        }, error: function (response) {
        }
    });
}

function getPosts(userP) {
    $.ajax({
        type: "GET",
        headers: { Authorization: 'Bearer ' + userLogged.token },
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
                    if (userP == userLogged.id_user) {
                        if (element['user']['id_user'] == userLogged.id_user) {
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
                        } else {
                            $("#profilePosts").append("<div class='usersPost'>" +
                                "<span class='w-100'><i class='fa fa-retweet' aria-hidden='true'></i> Respoted per mi</span>" +
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
                        }
                    } else {
                        if (userP == element['user']['id_user']) {
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
                        } else {
                            $("#profilePosts").append("<div class='usersPost'>" +
                                "<span class='w-100'><i class='fa fa-retweet' aria-hidden='true'></i> Respoted per mi</span>" +
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
                        }

                    }
                });
            }
        },
        error: function (response) {
        }
    });
}

function getProfile(userP) {
    $.ajax({
        type: "GET",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/users/" + userP,
        dataType: "json",
        success: function (response) {
            getUserCategory();
            $(".profileImg").attr("src", response['picture']);
            $("#inputName").val(response['name']);
            $("#inputUsername").val(response['username']);
            $("#inputEmail").val(response['email']);
            if (response['location'] != null) {
                let location = response['location'];
                let textUbication = "Location: </br>- Latitude: " + location.substr(0, location.indexOf(',')) + "</br>- Longitude: " + location.substr(location.indexOf(',') + 1);
                $("#textUbication").html(textUbication);
            }
            $("#inputEmail").val(response['email']);
            $("#inputDescription").text(response['description']);
            $(".modalUsername").text(response['username']);
            $("#nameProfile").text(response['name']);
            $("#usernameProfile").text(response['username']);
            $("#descriptionProfile").text(response['description']);
            $("#followersCount").html("<strong>" + response['followers'] + " Seguidors</strong>");
            $("input[name=radioAllow][value=" + response['allowLocation'] + "]").attr('checked', 'checked');
        },
        error: function (response) {
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