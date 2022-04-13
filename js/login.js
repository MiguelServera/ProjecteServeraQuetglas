const url = ""
$(function () {
    $("#register").click(function (e) { 
        e.preventDefault();
        verifyEmail();
        registerUser();
    });
});

function verifyEmail(){
    
}

function registerUser(){
    $.ajax({
        type: "POST",
        url: url+"/registerUser",
        data: {
            "email": $("#registerEmail").val(),
            "password": $("#registerPassword").val(),
            "userName": $("#registerUsername").val()
        },
        dataType: "dataType",
        success: function (response) {
            
        }
    });
}