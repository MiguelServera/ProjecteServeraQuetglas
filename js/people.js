let user = "";
let username = "";
var imagen = "";
let distance = 0;
var array = []
let check1 = false;
let check2 = false;
let check3 = false;

if (Cookies.get("user") != undefined) {
  user = Cookies.get("user");
  username = Cookies.get("username");
} else {
          window.top.location.href = "index.html";
}

$(document).ready(function () {
  getEvents();
  getEvents2();
  $("#navUserImg").attr('src', userLogged.picture);
  $("#logOut").click(function (e) {
    e.preventDefault();
    Cookies.remove("user");
    Cookies.remove("username");
            window.top.location.href = "index.html";
  });

  $(".filtersButton").click(function (e) {
    e.preventDefault();
    if ($(".peopleDiv").is(':visible')) {
      $(".filtersButton").html("<i class='fa fa-arrow-circle-left' aria-hidden='true'></i>People");
      $(".peopleDiv").fadeOut(500, function () {
        $(".filters").fadeIn();
      });

    } else {
      $(".filtersButton").html("<i class='fa fa-arrow-circle-right' aria-hidden='true'></i>Filters");
      $(".filters").fadeOut(500, function () {
        $(".peopleDiv").fadeIn();
      });
    }
  });
  $('input[type=radio][name=radioDistance]').change(function () {
    getPeopleNearby();
  });

  $('select').change(function () {
    getPeopleNearby();
  });
  getCategories();
  getPeopleNearby()
});

function getEvents2() {
  $.ajax({
      type: "GET",
      headers: { Authorization: 'Bearer ' + userLogged.token },
      url: url + "/events",
      dataType: "json",
      success: function (response) {
          let contador = 0;
          let bool = 0;
          let string = "";
          $(".events2").empty();
          response.forEach(element => {
              console.log(element);
              string += '<div class="swiper-slide">' +
                  '<div class="eventProfile col-12">' +
                  '<h4>' + element["name"] + '</h4>' +
                  '<h5>Lloc de event: ' + element["location"] + '</h5>' +
                  '<img src="' + element["picture"] + '" alt="">' +
                  '<p class="descripcionEvento">' + element["description"] + '</p>' +
                  '</div></div>';
          });
          $(".events2").html(string);
      },
      error: function (response) {
        if (response.status == 401) {
                  window.top.location.href = "index.html";
        }
      }
  });
}

function getEvents() {
  $.ajax({
    type: "GET",
    headers: { Authorization: 'Bearer ' + userLogged.token },
    url: url + "/events",
    dataType: "json",
    success: function (response) {
      let contador = 0;
      let bool = 0;
      let string = "";
      $(".events").empty();
      response.forEach(element => {
        if (contador == 0) {
          if (bool != 1) {
            string += '<div class="carousel-item active">' +
            '<div class="d-flex h-100 justify-content-center bg-light">' +
            '<div class="eventProfile col-4">' +
            '<h4>' + element["name"] + '</h4>' +
            '<h5>Lloc de event: ' + element["location"] + '</h5>' +
            '<img src="' + element["picture"] + '" alt="">' +
            '<p class="descripcionEvento">' + element["description"] + '</p>' +
            '</div>';
            contador++;
          } else {
            string += '<div class="carousel-item">' +
            '<div class="d-flex h-100 justify-content-center bg-light">' +
            '<div class="eventProfile col-4">' +
            '<h4>' + element["name"] + '</h4>' +
            '<h5>Lloc de event: ' + element["location"] + '</h5>' +
            '<img src="' + element["picture"] + '" alt="">' +
            '<p class="descripcionEvento">' + element["description"] + '</p>' +
            '</div>';
            contador++;
          }
          
        } else {
          if (contador == 1) {
            string += '<div class="eventProfile col-4">' +
              '<h4>' + element["name"] + '</h4>' +
              '<h5>Lloc de event: ' + element["location"] + '</h5>' +
              '<img src="' + element["picture"] + '" alt="">' +
              '<p class="descripcionEvento">' + element["description"] + '</p>' +
              '</div></div></div>';
            contador++;
            contador = 0;
            bool = 1;
          }
        }
      });
      $(".events").html(string);
    },
    error: function (response) {
      if (response.status == 401) {
                window.top.location.href = "index.html";
      }
    }
  });
}

function getCategories() {
  $.ajax({
    type: "GET",
    headers: { Authorization: 'Bearer ' + userLogged.token },
    url: url + "/categories",
    dataType: "json",
    success: function (response) {
      response.forEach(element => {
        $(".filterCategories").append("<option value='" + element['id_category'] + "'>" + element['name'] + "</option>");
      });
      check1 = true;
      checkChecks();
    },
    error: function (response) {
      if (response.status == 401) {
                window.top.location.href = "index.html";
      }
    }
  });
}
function getPeopleNearby() {
  array = [];
  var categories = "";
  $('.radioDistance').each(function (indexInArray, valueOfElement) {
    if ($(this).is(':checked')) {
      distance = $(this).val();
    }
  });
  $("select").each(function (index, element) {
    if ($(element).has('option:selected')) {
      if ($(element).val() != "") {
        categories += $(element).val() + ",";
      }
    }
  });
  categories = categories.slice(0, -1);
  $.ajax({
    type: "POST",
    headers: { Authorization: 'Bearer ' + userLogged.token },
    url: url + "/users/nearby/" + userLogged.id_user,
    dataType: "json",
    data: {
      distance: distance,
      categories: categories
    },
    success: function (response) {
      $(".peopleNearby").remove();
      let location = "";
      $(".people").empty();
      if (response.result !== null) {
        response.result.forEach(element => {

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
            $(".people").append("<div role='button' id='" + element['id_user'] + "' class='d-flex peopleNearby'>" +
              "<img class='userIcon mr-2' src='" + element['picture'] + "' alt='' />" +
              "<div class='userInfo mw-100'>" +
              "<div class='name'>" +
              "<input id='" + element['id_user'] + "' type='hidden' name=''>" +
              "<span>" + element['username'] + "</span>" +
              "</div>" +
              "<div class='description'>" +
              "<span>"+element['description']+"</span>" +
              "</div>" +
              "</div>" +
              "</div>");
          }
        });
        $(".peopleNearby").click(function (e) {
          let idUserClicked = $(this).attr("id");
          window.parent.document.getElementById('contenedor').src = 'profile.html?user=' + idUserClicked;
        });
      }
      initMap(array)
    }, error: function (response) {
      $(".people").html("<h3 id='warningPostsProfile' class='d-flex h-100 w-100 text-center flex-column justify-content-center align-items-center'>NO HI HA USUARIS A PROP</h3>");
      initMap(array)
    }
  });
}

function initMap(array) {
  $("#map").empty();
  $("#map2").empty();
  let location = userLogged.location;
  if (location != null) {
    $("#map").html("");
    $("#map2").html("");
    let latitud = location.substr(0, location.indexOf(','));
    let longitud = location.substr(location.indexOf(',') + 1);

    const myLatLng = { lat: parseFloat(latitud), lng: parseFloat(longitud) };

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: myLatLng,
      position: myLatLng,
    });

    var map2 = new google.maps.Map(document.getElementById("map2"), {
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
      map: map,
      icon: icon
    });

    new google.maps.Marker({
      position: myLatLng,
      map: map2,
      icon: icon
    });

    if (array !== undefined) {
      array.forEach(element => {
        icon.url = element['img'] + '#custom_marker';
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(element['longitudVar']), parseFloat(element['latitudVar'])),
          map: map,
          icon: icon
        })
        marker2 = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(element['longitudVar']), parseFloat(element['latitudVar'])),
          map: map2,
          icon: icon
        })
      });
    }
    check2 = true;
    checkChecks();
  } else {
    check2 = true;
    checkChecks();
    $("#map").html("<span>ACTIVA LA LOCALITZACIÓ PER PODER VEURE A PERSONES ARREU TEVA</span>");
    $("#map2").html("<span>ACTIVA LA LOCALITZACIÓ PER PODER VEURE A PERSONES ARREU TEVA</span>");
  }
}

function checkChecks() {
  if (check1 == true && check2 == true) {
    $(".spinnerContainer").fadeOut();
    $(".spinnerContainer").removeClass("d-flex");
    $(".spinnerMusic").hide();
    $(".main-container").fadeIn(1000);
  }
}