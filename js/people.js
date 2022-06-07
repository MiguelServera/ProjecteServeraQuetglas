let user = "";
let username = "";
var imagen = "";
let distance = 0;
var array = []

if (Cookies.get("user") != undefined) {
  user = Cookies.get("user");
  username = Cookies.get("username");
} else {
  window.location.href = "login.html";
}

$(document).ready(function () {
  $("#navUserImg").attr('src', userLogged.picture);
  $(".filters").hide();
  $("#logOut").click(function (e) {
    e.preventDefault();
    Cookies.remove("user");
    Cookies.remove("username");
    window.location = "login.html";
  });

  $(".filtersButton").click(function (e) {
    e.preventDefault();
    if ($(".peopleDiv").is(':visible')) {
      $(".peopleDiv").animate({ width: 'hide' }, () => {
        $(".filters").animate({ width: 'show' });
      });
    } else {
      $(".filters").animate({ width: 'hide' }, () => {
        $(".peopleDiv").animate({ width: 'show' });
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
    }, error: function (response) {
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
    // element == this
    console.log($(element).val());
    if ($(element).has('option:selected')) {
      if ($(element).val() != "") {
        console.log("He entrat0" + $(element).val())
        categories += $(element).val() + ",";
      }
    }
  });
  categories = categories.slice(0, -1);
  console.log(categories);
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
      console.log("No hay illoh pero en verdad si");
      $(".peopleNearby").remove();
      let location = "";
      $(".people").empty();

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
          $(".people").append("<div class='d-flex peopleNearby'>" +
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
      $(".people").html("<h3 id='warningPostsProfile' class='d-flex h-100 w-100 text-center flex-column justify-content-center align-items-center'>NO HI HA USUARIS A PROP</h3>");
      initMap(array)
    }
  });
}

function initMap(array) {
  $("#map").empty();
  let location = userLogged.location;
  let latitud = location.substr(0, location.indexOf(','));
  let longitud = location.substr(location.indexOf(',') + 1);

  const myLatLng = { lat: parseFloat(latitud), lng: parseFloat(longitud) };

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
  console.log(array);
  if (array !== undefined) {
    array.forEach(element => {
      icon.url = element['img'] + '#custom_marker';
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(element['longitudVar']), parseFloat(element['latitudVar'])),
        map: map,
        icon: icon
      })
    });
  }
}