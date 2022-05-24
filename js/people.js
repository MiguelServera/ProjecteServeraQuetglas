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

function getPeopleNearby() {
  $.ajax({
    type: "GET",
    url: url + "/users/11/nearby/0",
    dataType: "json",
    success: function (response) {
      console.log(response);
      let location = "";
      let ubicationUser
      let array = []
      response.result.forEach(element => {
        console.log("Los de la ubi");
        console.log(element);
        if (element['id_user'] != userLogged.id_user) {
          location = element['location'];
          let longitud = location.substr(0, location.indexOf(','));
          let latitud = location.substr(location.indexOf(',') + 1);
          array.push({
            longitudVar: longitud,
            latitudVar: latitud,
            img: element['picture']
          })
          imagen = element["picture"];
          $(".people").append("<div class='d-flex'>" +
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
        }
      });
      initMap(array)
    }, error: function (response) {
      console.log(response);
    }
  });
}

function initMap(array) {
  // The location of Uluru
  // The location of Uluru
  let location = userLogged.location;
  let latitud = location.substr(0, location.indexOf(','));
  let longitud = location.substr(location.indexOf(',') + 1);

  const myLatLng = { lat: parseFloat(latitud), lng: parseFloat(longitud) };

  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: myLatLng,
    position: myLatLng,
  });


  let icon = {
    url: userLogged.picture + '#custom_marker', // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(15, 15) // anchor
  };
  new google.maps.Marker({
    position: myLatLng,
    map,
    icon: icon
  });

  array.forEach(element => {
    icon.url = element.img + '#custom_marker';
    console.log(element);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseFloat(element['latitudVar']), parseFloat(element['longitudVar'])),
      map: map,
      icon: icon
    })
  });
  // The marker, positioned at Uluru
}

    // The marker, positioned at Uluru
