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
getRecentChats();
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
      retrieveMessagesFromUser();
      getRecentChats();
    }
  });
}

function retrieveMessagesFromUser() {
  console.log("Entré!");
  $.ajax({
    type: "GET",
    url: url + "/messages/chat/" + user + "/" + otherUser,
    dataType: "json",
    success: function (response) {
      console.log(response);
      $(".messages").empty();
      response.forEach(element => {
        if (element['userFrom']['id_user'] != user) {
          console.log(element['userTo']['picture']);
          $(".messages").append("<div id='" + element['id_message'] + "' class='followerMessage'>" +
            "<div class='userInfo mw-100 w-100'>" +
            "<div id='' class='textMessageFollower w-100 d-flex'>" +
            "<img class='userIcon mr-2' src='"+element['userFrom']['picture']+"' alt='' />" +
            "<p>" + element['text'] + "</p>" +
            "</div>" +
            "</div>" +
            "</div>");
        } else {
          console.log(element['userFrom']['picture']);
          $(".messages").append("<div id='" + element['id_message'] + "' class='userMessage'>" +
            "<div class='userInfo mw-100 w-100'>" +
            "<div id='' class='textMessage w-100 d-flex'>" +
            "<p class='textUserMessage'>" + element['text'] + "</p>" +
            "<img class='userIcon mr-2' src='"+element['userFrom']['picture']+"' alt='' />" +
            "</div>" +
            "</div>" +
            "</div>");
        }
      });
      $("#msg").scrollTop($("#msg")[0].scrollHeight);

    }, error: function (response) {
    }
  });
}

function getFollowersMessages() {
  $.ajax({
    type: "GET",
    url: url + "/followers/" + user,
    dataType: "json",
    success: function (response) {
      response.forEach(element => {
        $("#followersMessages").append("<div id='" + element['userFollows'] + "' class='followerChat'>" +
          "<div class='d-flex'>" +
          "<img class='userIcon mr-2' src='"+element['picture']+"' alt='' />" +
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

function getRecentChats() {
  $.ajax({
    type: "GET",
    url: url + "/messages/list/" + user,
    dataType: "json",
    success: function (response) {
      $("#allChats").empty();
      response.forEach(element => {
        $("#allChats").append("<div id='" + element[0]['id_user'] + "' class='followerChat overflow-hidden'>" +
          "<div class='d-flex'>" +
          "<img class='userIcon mr-2' src='"+element[0]['picture']+"' alt='' />" +
          "<div class='userInfo mw-100'>" +
          "<div class='name'>" +
          "<span>" + element[0]['username'] + "</span>" +
          "</div>" +
          "<div class='message'>" +
          "<span>"+element[1]['text']+"</span>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>");
      });
      $(".followerChat").click(function (e) {
        otherUser = $(this).attr("id");
        retrieveMessagesFromUser();
        $("#chatFollower").modal('show');
        $("#newMessages").modal('hide');
      });
    }
  });
}