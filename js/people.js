const url = "http://stm.projectebaleart.com/public/api"
let user = "";
let username = "";

if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href = "http://localhost/ProjecteServeraQuetglas/login.html";
}

$(document).ready(function () {
    initMap();

    $("#logOut").click(function (e) { 
      e.preventDefault();
      Cookies.remove("user");
      Cookies.remove("username");
      window.location = "http://localhost/ProjecteServeraQuetglas/login.html";
  });

  getPeopleNearby()
});

function getPeopleNearby(){
  $.ajax({
    type: "GET",
    url: url+"/users/11/nearby/2",
    dataType: "json",
    success: function (response) {
      console.log(response);
      response.result.forEach(element => {
      $(".people").append("<div class='d-flex'>"+
      "<img class='userIcon mr-2' src='"+element['picture']+"' alt='' />"+
      "<div class='userInfo mw-100'>"+
      "<div class='name'>"+
      "<input id='"+element['id_user']+"' type='hidden' name=''>"+
      "<span>"+element['username']+"</span>"+
      "</div>"+
      "<div class='description'>"+
      "<span>Pues mira soy Pep</span>"+
      "</div>"+
      "</div>"+
      "</div>");
      });
      
    }, error: function(response){
      console.log(response);
    }
  });
}

function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    const maluru = { lat: -20.444, lng: 60.031 };
    const eluru = { lat: 20.344, lng: 300.031 };
    const ctulu = { lat: 50.344, lng: 131.031 };

    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });

    const marker2 = new google.maps.Marker({
        position: maluru,
        map: map,
      });

      const marker3 = new google.maps.Marker({
        position: eluru,
        map: map,
      });

      const marker4 = new google.maps.Marker({
        position: ctulu,
        map: map,
      });
  }
  
  window.initMap = initMap;