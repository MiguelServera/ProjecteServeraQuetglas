const url2 = "http://stm.projectebaleart.com/public/api"
$(function () {
    $(".spinner").hide();
    $(this).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
          $("#login").click();
        }
    });

    $("#register").click(function (e) { 
        e.preventDefault();
        registerUser();
    });

    $("#login").click(function (e) { 
        e.preventDefault();
        $(".spinner").show();
        loginUser();
    });

    $("#bckLogin").click(function (e) { 
        e.preventDefault();
        $(".register-form").fadeOut(500, function(){
            $(".login-form").fadeIn(1500);
        });
    });

    $("#chgRegister").click(function (e) { 
        e.preventDefault();
        $(".login-form").fadeOut(500, function(){
            $(".register-form").fadeIn(1500);
        });
    });
    $(".register-form").hide();
});

function registerUser(){
    $.ajax({
        type: "POST",
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        url: url2+"/users",
        data: {
            "email": $("#registerEmail").val(),
            "password": $("#registerPassword").val(),
            "username": $("#registerUsername").val(),
            "name": $("#registerName").val()
        },
        dataType: "json",
        success: function (response) {
        }
    });
}

function loginUser(){
    $.ajax({
        type: "POST",
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        url: url2+"/login",
        data: {
            "email": $("#loginEmail").val(),
            "password": $("#loginPassword").val(),
        },
        dataType: "json",
        success: function (response) {
            userToken = response.token;
            id_userLog = response.id_user;
            Cookies.set('user', response.id_user);
            Cookies.set('username', response.username);
            Cookies.set('token', response.token);
            getUserLogged();
            $(".spinner").hide();
            window.location.href="index.html";
        }, error: function(response){
            console.log(response);
            $(".spinner").hide();
        }
    });
}