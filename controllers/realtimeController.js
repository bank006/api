const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Realtime Location Server');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // รับข้อมูลตำแหน่งจาก client
  socket.on('sendLocation', (location) => {
    console.log('Location received:', location);
    
    // ส่งข้อมูลตำแหน่งไปให้ client ทุกคน
    io.emit('updateLocation', location);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
