mapboxgl.accessToken =
'pk.eyJ1IjoiZG9ub3ZhbnRmbCIsImEiOiJjazlhdWl0eXAwaDd4M29zMnpxNjlpemo5In0.IBvGxMbyW55PhJDZrL8dbQ';

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 12,
});

//habilitamos gecoder en nuestro mapa

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
  })
);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { longitude, latitude } }) => {
      const userPosition = [longitude, latitude];
      map.setCenter(userPosition);
    }
  );
}

const $geocoder = document.querySelector(".mapboxgl-ctrl-geocoder--input");

$geocoder.onchange = addCoordsToForm;

function addCoordsToForm() {
  // necesitamos obtener las coordenadas del centro del mapa actualmente
  const { lng, lat } = map.getCenter();
  //taemos los inputs de html al mundo de js mediante la api  del DOM
  const $lng = document.getElementById("longitude");
  const $lat = document.getElementById("latitude");
  const $name = document.getElementById("name");
  const $button = document.querySelector("#submit");
  // asignamos a la propiedad value los elementos de las coordenadas y del name que viene del valor del geocoder
  $lng.value = lng;
  $lat.value = lat;
  $name.value = $geocoder.value.split(",")[0];
  $button.removeAttribute("disabled");
}