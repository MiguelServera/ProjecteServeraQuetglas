const url2 = "http://stm.projectebaleart.com/public/api"

/*if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href = "login.html";
}*/

var userToken = "";
var userLogged = {

};
$(document).ready(function () {
    console.log("User "+userToken);
    $.ajax({
        type: "GET",
        url: url2 + "/users/" + user,
        headers: { Authorization: 'Bearer ' + userToken },
        dataType: "json",
        async: false,
        success: function (response) {
            console.log(response);
            userLogged.id_user = response['id_user'];
            userLogged.name = response['name'];
            userLogged.username = response['username'];
            userLogged.email = response['email'];
            userLogged.picture = response['picture'];
            userLogged.name = response['name'];
            userLogged.location = response['location'];
            userLogged.token = response['token'];
            console.log("User "+userLogged.token);
            console.log(response);        },
        error: function (response) {
            console.log("User "+userLogged.token);
            console.log(response);
        }
    });
});