$(function () {
    getFollowersMusic();
});

function getFollowersMusic(){
    $.ajax({
        type: "GET",
        url: "http://stm.projectebaleart.com/public/api/followers/"+userLogged['id_user'],
        dataType: "json",
        success: function (response) {
            console.log(response);
            response.forEach(element => {
                console.log(element);
                $(".followersMusic").append("<div class='m-2'>" +
                "<img class='userIcon mr-2' src='" + element['picture'] + "' alt='' />" +
                "<div class='userInfo mw-100'>" +
                "<div class='name'>" +
                "<input id='" + element['id_user'] + "' type='hidden' name=''>" +
                "<span>" + element['username'] + "</span>" +
                "</div>" +
                "<div class='description'>" +
                "<span>Pues mira soy Pep</span>" +
                "</div>" +
                "</div>" +
                "</div>"); 
            });
        }, error: function(response){
            console.log(response);
        }
    });
}