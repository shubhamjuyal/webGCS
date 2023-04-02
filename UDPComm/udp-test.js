const dgram = require('dgram');

// Create a UDP socket
const server = dgram.createSocket('udp4');

// Listen on a specific port and IP address
const ADDRESS = '127.0.0.1'; // Listen on all available network interfaces
const PORT = 5005;

server.on('listening', function() {
    console.log(`UDP server listening on ${ADDRESS}:${PORT}`);
});

server.on('message', function(msg, rinfo) {
    const datu = JSON.parse(msg.toString());
    console.log(`Lat: ${datu.lat} Lon: ${datu.lon}`);
});

server.bind(PORT, ADDRESS);
