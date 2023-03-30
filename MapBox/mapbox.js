mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kZWxsYWFlcm9zcGFjZSIsImEiOiJjbGZ1eHoxOHgwMXg3M25wZG1qbmE2MWt3In0.vk3oVYhuldbPNNOu-7VbfA';
const map = new mapboxgl.Map({
container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});
