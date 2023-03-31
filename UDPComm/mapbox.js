// Plotting Map from MapBox
L.mapbox.accessToken = 'pk.eyJ1Ijoicm9kZWxsYWFlcm9zcGFjZSIsImEiOiJjbGZ1eHoxOHgwMXg3M25wZG1qbmE2MWt3In0.vk3oVYhuldbPNNOu-7VbfA';
    var map = L.mapbox.map('map')
        .setView([28.7041,77.1025], 8)
        .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

    var myLayer = L.mapbox.featureLayer().addTo(map);
    

// Getting LAT LONG from the mavlink
console.log("Running...");
var latu=30.7333,longu=76.7794;
var socket = io("http://localhost:5050");
    socket.on('data', function(data) {
    
    if (data.mavpackettype == 'GLOBAL_POSITION_INT') {
        const lat = data.lat / 1e7;
        const lng = data.lon / 1e7;
        latu=lat;
        longu=lng;
        console.log(latu, longu);
        // Parameters to set MARKER on Map 
        var geoJson = {
            type: 'FeatureCollection',
            features: [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [longu, latu] // DELHI COORDINATES (LON, LAT)
                    // "coordinates": [76.7794, 30.7333] // CHANDIGARH COORDINATES (LON, LAT)
                },
        
                // To set custom MARKER
                "properties": {
                    "title": "Drone",
                    "icon": {
                        "iconUrl": "/point.png",
                        "iconSize": [50, 50], // size of the icon
                        "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                        "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                        "className": "dot"
                    }
                }
            }]
            };
        // Set a custom icon on each marker based on feature properties
        myLayer.on('layeradd', function(e) {
        var marker = e.layer,
            feature = marker.feature;

        marker.setIcon(L.icon(feature.properties.icon));
        });

    
        // socket.on('data', (data) => {
        //     if (data.mavpackettype == 'GLOBAL_POSITION_INT') {
        //         const lat = data.lat / 1e7;
        //         const lng = data.lon / 1e7;
        //         console.log(lat, lng);
        //     }
        //     // Update your application with the live data
        // });
    
        // function plotCoordinatesOnMapbox(lat, lon) {
        //     // Update the marker layer
        //     marker.setLngLat([lon, lat]);
        //   }
        
        // Add features to the map.
        myLayer.setGeoJSON(geoJson);
    }
})
// console.log(latu, longu);
