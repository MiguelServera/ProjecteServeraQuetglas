$(function () {
  let otherUser = 0;
  let user = Cookies.get("user");

  getFollowersMessages();

  $("#buttonInput").click(function (e) {
    insertMessage();
  });

  $("#logOut").click(function (e) { 
    e.preventDefault();
    Cookies.remove("user");
    Cookies.remove("username");
    window.location = "http://localhost/ProjecteServeraQuetglas/login.html";
});

});

function insertMessage() {
  $.ajax({
    type: "POST",
    url: url + "/messages",
    data: {
      "text": $("#inputUser").val(),
      "userFrom": user,
      "userTo": otherUser
    },
    dataType: "json",
    success: function (response) {
      console.log(response);
      retrieveMessagesFromUser();
    }
  });
}

function retrieveMessagesFromUser() {
  console.log("Entré!");
  $.ajax({
    type: "GET",
    url: url + "/messages/" + user + "/" + otherUser,
    dataType: "json",
    success: function (response) {
      console.log("Hello");
      console.log(response);
      $(".messages").empty();
      response.forEach(element => {
        if (element['userFrom'] != user) {
          $(".messages").append("<div id='" + element['id_message'] + "' class='followerMessage w-75'>" +
            "<div class='userInfo mw-100 w-100'>" +
            "<div id='' class='textMessageFollower w-100 d-flex'>" +
            "<img class='userIcon mr-2' src='img/userIcon.png' alt='' />" +
            "<p>" + element['text'] + "</p>" +
            "</div>" +
            "</div>" +
            "</div>");
        } else {
          $(".messages").append("<div id='" + element['id_message'] + "' class='userMessage w-75'>" +
            "<div class='userInfo mw-100 w-100'>" +
            "<div id='' class='textMessage w-100 d-flex'>" +
            "<p class='textUserMessage'>" + element['text'] + "</p>" +
            "<img class='userIcon mr-2' src='img/userIcon.png' alt='' />" +
            "</div>" +
            "</div>" +
            "</div>");
        }
      });
      $("#msg").scrollTop($("#msg")[0].scrollHeight);

    }, error: function (response) {
      console.log("bbai");

      console.log(response);
    }
  });
}

function getFollowersMessages() {
  $.ajax({
    type: "GET",
    url: url + "/followers/" + user,
    dataType: "json",
    success: function (response) {
      console.log(response);
      response.forEach(element => {
        $("#followersMessages").append("<div id='" + element['userFollows'] + "' class='followerChat'>" +
          "<div class='d-flex'>" +
          "<img class='userIcon mr-2' src='img/userIcon.png' alt='' />" +
          "<div class='userInfo mw-100'>" +
          "<div class='name'>" +
          "<span>" + element['userFollows'] + "</span>" +
          "</div>" +
          "<div class='message'>" +
          "<span>Oye habla conmigo vamos!</span>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>");
      });
      $(".followerChat").click(function (e) {
        otherUser = $(this).attr("id");
        console.log("Yo: " + user + " - " + otherUser);
        retrieveMessagesFromUser();
        $("#chatFollower").modal('show');
        $("#newMessages").modal('hide');
      });
    }
  });
}