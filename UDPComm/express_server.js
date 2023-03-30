
// Import dependencies
const express = require('express');
const net = require('net');
const http = require('http');


// Initialize Express app
const app = express();


// Create a HTTP server using the Express app
const server = http.createServer(app);


const io = require('socket.io')(server, {
  cors: {
	origin: '*',
  }
});



// Define the TCP server options
const tcpServerOptions = {
	host: '127.0.0.1',
	port: 8000
};


// Create a TCP server
const tcpServer = net.createServer();


// Listen for incoming connections
tcpServer.listen(tcpServerOptions, () => {
	console.log(`TCP server listening on ${tcpServerOptions.host}:${tcpServerOptions.port}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // if(jsndata)
    //     io.emit('data', jsndata);
    });

// Handle incoming connections
tcpServer.on('connection', (socket) => {
	console.log(`TCP client connected from ${socket.remoteAddress}:${socket.remotePort}`);


	// Listen for incoming data
	socket.on('data', (data) => {
    	// console.log(`Received data from TCP client: ${data}`);

        

    	const jsndata = JSON.parse(data);
    	// if(jsndata)
      	// console.log(jsndata);

    	// Send the data to connected Socket.IO clients
    	io.emit('data', jsndata);
	});


	// Handle client disconnection
	socket.on('close', () => {
    	console.log(`TCP client disconnected from ${socket.remoteAddress}:${socket.remotePort}`);
	});
});


// Start the HTTP server
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
	console.log(`HTTP server listening on port ${PORT}`);
});
