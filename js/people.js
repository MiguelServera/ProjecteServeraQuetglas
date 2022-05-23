const url = "http://stm.projectebaleart.com/public/api"
let user = "";
let username = "";
var imagen = "";
if (Cookies.get("user") != undefined) {
    user = Cookies.get("user");
    username = Cookies.get("username");
} else {
    window.location.href = "http://localhost/ProjecteServeraQuetglas/login.html";
}

$(document).ready(function () {
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
      let location = "";
      let ubicationUser
      let array = []
      response.result.forEach(element => {
        location = element['location'];
        let longitud = location.substr(0, location.indexOf(','));
        let latitud = location.substr(location.indexOf(',')+1);
        array.push({
          longitudVar: longitud,
          latitudVar: latitud
        })
        imagen = element["picture"];
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
      initMap(array)
    }, error: function(response){
      console.log(response);
    }
  });
}

function initMap(array) {
    // The location of Uluru
    // The location of Uluru
    const maluru = { lat: -2.344, lng: 131.031 };

    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: maluru,
      position: maluru,
      icon: imagen
    });
    array.forEach(element => {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(element['latitudVar'], element['longitudVar']),
        map: map
      })
    });
    // The marker, positioned at Uluru
  }

    // The marker, positioned at Uluru
