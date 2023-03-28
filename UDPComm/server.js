const dgram = require('dgram');
const server = dgram.createSocket('udp4');

// Configure UDP socket to listen for MAVLink data
const port = 5501;
server.on('listening', () => {
    const address = server.address();
    console.log(`MAVLink server listening on ${address.address}:${address.port}`);
});
server.on('message', (data, remote) => {
    // Parse incoming data as JSON and process as desired
    const jsonMsg = JSON.parse(data.toString('utf-8'));
    console.log(jsonMsg);
});

// Start listening on UDP socket
server.bind(port);
