const url = "http://stm.projectebaleart.com/public/api"

if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href = "http://localhost/ProjecteServeraQuetglas/login.html";
}

var userLogged = {
    id_user: 0,
    name : "ABC",
    username : 18,
    email : "CSE",
    password : 90,
    picture : "",
    location: ''
};
$.ajax({
        type: "GET",
        url: url + "/users/" + user,
        dataType: "json",
        success: function (response) {
            console.log("Hello");
            console.log(response);
            userLogged.name = response['id_user'];
            userLogged.name = response['name'];
            userLogged.username = response['username'];
            userLogged.email = response['email'];
            userLogged.picture = response['picture'];
            userLogged.name = response['name'];
            userLogged.location = response['location'];
            console.log(userLogged);
        },
        error: function (response) {
            console.log(response);
    }
});
