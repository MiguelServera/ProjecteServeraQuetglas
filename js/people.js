$(document).ready(function () {
    initMap();
});

function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    const maluru = { lat: -20.444, lng: 60.031 };
    const eluru = { lat: 20.344, lng: 300.031 };
    const ctulu = { lat: 50.344, lng: 131.031 };

    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
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
        position: ulurctuluu,
        map: map,
      });
  }
  
  window.initMap = initMap;