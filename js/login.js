const url = "http://stm.projectebaleart.com/public/api"
$(function () {
    Cookies.set('user', "aaa");
    Cookies.remove("user");

    $("#register").click(function (e) { 
        e.preventDefault();
        verifyEmail();
        registerUser();
    });

    $("#login").click(function (e) { 
        e.preventDefault();
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
        url: url+"/users",
        data: {
            "email": $("#registerEmail").val(),
            "password": $("#registerPassword").val(),
            "username": $("#registerUsername").val(),
            "name": $("#registerName").val()
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
}

function loginUser(){
    console.log($("#loginEmail").val() + $("#loginPassword").val());
    $.ajax({
        type: "POST",
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        url: url+"/login",
        data: {
            "email": $("#loginEmail").val(),
            "password": $("#loginPassword").val(),
        },
        dataType: "json",
        success: function (response) {
            Cookies.set('user', response.id_user);
            window.location.href="http://localhost/SpotTheMusic/ProjecteServeraQuetglas/";
        }
    });
}

function verifyEmail(){
    
} 