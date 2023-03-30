const net = require('net');


const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    // console.log(`Received data from client: ${data}`);
    console.log(`------ From Client ------\n${data} \n`);
    const jsndata = JSON.parse(data);
    if(jsndata)
      console.log(jsndata);
    // Process the received data as needed
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//   }
// });

// io.on('connection', (socket) => {
// console.log('a user connected');
// });


server.listen(8000, () => {
  console.log('Server listening on port 8080');
});
