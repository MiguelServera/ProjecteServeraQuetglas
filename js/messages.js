$(function () {
  let otherUser = 0;
  let user = Cookies.get("user");

  getFollowersMessages();

  $("#buttonInput").click(function (e) {
    insertMessage();
  });

  $("#logOut").click(function (e) { 
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: url + "/logout",
      headers: { Authorization: 'Bearer ' + userLogged.token },
      dataType: "json",
      success: function (response) {
      }
    });
    Cookies.remove("user");
    Cookies.remove("username");
            window.top.location.href = "index.html";
  });
getRecentChats();
});

function insertMessage() {
  $.ajax({
    type: "POST",
    url: url + "/messages",
    headers: { Authorization: 'Bearer ' + userLogged.token },
    data: {
      "text": $("#inputUser").val(),
      "userFrom": user,
      "userTo": otherUser
    },
    dataType: "json",
    success: function (response) {
      $("#inputUser").val("");
      retrieveMessagesFromUser();
      getRecentChats();
    }
  });
}

function retrieveMessagesFromUser(otherUserUsername) {
  $.ajax({
    type: "GET",
    url: url + "/messages/chat/" + user + "/" + otherUser,
    headers: { Authorization: 'Bearer ' + userLogged.token },
    dataType: "json",
    success: function (response) {
      $(".messages").empty();
      $("#followerUsername").text(otherUserUsername);
      response.forEach(element => {
        if (element['userFrom']['id_user'] != user) {
          $(".messages").append("<div id='" + element['id_message'] + "' class='followerMessage'>" +
            "<div class='userInfo mw-100 w-100'>" +
            "<div id='' class='textMessageFollower w-100 d-flex'>" +
            "<img class='userIcon mr-2' src='"+element['userFrom']['picture']+"' alt='' />" +
            "<p>" + element['text'] + "</p>" +
            "</div>" +
            "<p>" + element['date'] + "</p>" +
            "</div>" +
            "</div>");
        } else {
          $(".messages").append("<div id='" + element['id_message'] + "' class='userMessage'>" +
            "<div class='userInfo mw-100 w-100'>" +
            "<div id='' class='textMessage w-100 d-flex'>" +
            "<p class='textUserMessage'>" + element['text'] + "</p>" +
            "<img class='userIcon mr-2' src='"+element['userFrom']['picture']+"' alt='' />" +
            "</div>" +
            "<p>" + element['date'] + "</p>" +
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
    headers: { Authorization: 'Bearer ' + userLogged.token },
    dataType: "json",
    success: function (response) {
      response.forEach(element => {
        $("#followersMessages").append("<div id='" + element['userFollows'] + "' class='followerChat'>" +
          "<div class='d-flex'>" +
          "<img class='userIcon mr-2' src='"+element['picture']+"' alt='' />" +
          "<div class='userInfo mw-100'>" +
          "<div class='name'>" +
          "<span id='"+element['username']+"'>" + element['username'] + "</span>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>");
      });
      $(".followerChat").click(function (e) {
        otherUser = $(this).attr("id");
        let otherUserUsername = $(this).find('.name').find('span').attr("id");
        retrieveMessagesFromUser(otherUserUsername);
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
    headers: { Authorization: 'Bearer ' + userLogged.token },
    dataType: "json",
    success: function (response) {
      $(".allChats").empty();
      response.forEach(element => {
        $(".allChats").append("<div id='" + element[0]['id_user'] + "' class='followerChat overflow-hidden' style='cursor: pointer;'>" +
          "<div class='d-flex'>" +
          "<img class='userIcon mr-2' src='"+element[0]['picture']+"' alt='' />" +
          "<div class='userInfo mw-100'>" +
          "<div class='name'>" +
          "<span id='"+element[0]['username']+"'>" + element[0]['username'] + "</span>" +
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
        let otherUserUsername = $(this).find('.name').find('span').attr("id");
        retrieveMessagesFromUser(otherUserUsername);
        $("#chatFollower").modal('show');
        $("#newMessages").modal('hide');
      });
    },
    error: function (response) {
      if (response.status == 401) {
                window.top.location.href = "index.html";
      }
    }
  });
  check3 = true;
  checkChecks();
}