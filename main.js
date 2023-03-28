var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
var darkMap = L.tileLayer.provider('Stadia.AlidadeSmoothDark');
var imageryMap = L.tileLayer.provider('Esri.WorldImagery'); //Environmental Systems Research Institute

var baseMaps = {
   osm : osmMap,
   dark: darkMap,
   esri: imageryMap
}

var map = L.map('map', {
    center: [22.735656852206496, 79.89257812500001],
    zoom: 5,
    layers: [osmMap]
});
var mapLayers = L.control.layers(baseMaps).addTo(map);

// var map = L.map('map').setView([51.505, -0.09], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);