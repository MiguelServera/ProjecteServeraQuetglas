const url = "http://stm.projectebaleart.com/public/api"

/*if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href = "login.html";
}*/


var userToken = Cookies.get("token");
let id_userLog = Cookies.get("user");
var userLogged = {

};

$(function () {
    getUserLogged();
});
function getUserLogged(){
    $.ajax({
        type: "GET",        
        headers: { Authorization: 'Bearer ' + userLogged.token },
        url: url + "/users/" + id_userLog,
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
            userLogged.token = userToken;
        },
        error: function (response) {
        }
    });
}