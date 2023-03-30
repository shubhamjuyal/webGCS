console.log("Running...");
var socket = io("http://localhost:5050");
    socket.on('data', function(data) {
    if (data.mavpackettype == 'GLOBAL_POSITION_INT') {
        const lat = data.lat / 1e7;
        const lng = data.lon / 1e7;
        console.log(lat, lng);
    }
})