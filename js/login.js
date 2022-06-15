const url2 = "http://stm.projectebaleart.com/public/api"
$(function () {
    $(".login-form").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
          $("#login").click();
        }
    });

    $(".register-form").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
          $("#register").click();
        }
    });

    $("#register").click(function (e) { 
        e.preventDefault();
        registerUser();
    });

    $("#login").click(function (e) { 
        e.preventDefault();
        $(".avis").text("");
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
        $(".spinner2").show();
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
            if (response.status != "Created") {
                if (typeof response.email !== 'undefined') {
                    $(".avisRegister").text("Aquest e-mail ja existeix");
                    $(".spinner2").hide();
                } else if (typeof response.username !== 'undefined') {
                    $(".avisRegister").text("Aquest username ja existeix");
                    $(".spinner2").hide();
                } else {
                    $(".avisRegister").text("Usuari registrat correctament");
                    $(".spinner2").hide();
                }
            } else {
                $(".avisRegister").text("Usuari registrat correctament");
                $(".spinner2").hide();
            }
            
        }, error: function(response){
            $(".avisRegister").text("Usuari no registrat");
            $(".spinner2").hide();
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
                    window.top.location.href="main.html";
        }, error: function(response){
            $(".avis").text("Credencials incorrectes");
            $(".spinner").hide();
        }
    });
}