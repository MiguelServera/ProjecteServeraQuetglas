const url = "http://localhost/SpotTheMusic/SpotTheMusic_API/SpotTheMusic_API/public/api"

$(function () {
    $(".sendPost").click(function (e) { 
        e.preventDefault();
        insertPost();
    });
});

function insertPost(){
    $.ajax({
        type: "POST",
        url: "url"+"",
        data: {
            "post":$("#textPost").val(),
            "user":$("#user").val()
        },
        dataType: "json",
        success: function (response) {
            
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

function followUser(){
    $.ajax({
        type: "POST",
        url: "url"+"",
        data: {
            "userFollows":$("#textPost").val(),
            "userFollowed":$("#user").val()
        },
        dataType: "json",
        success: function (response) {
            
        }
    });
}