export function generate(params: any): string {
	return `const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join:room', (room) => {
    socket.join(room);
    console.log(\`User \${socket.id} joined room \${room}\`);
  });
  
  socket.on('message:send', (data) => {
    io.to(data.room).emit('message:receive', {
      user: socket.id,
      message: data.message,
      timestamp: new Date().toISOString(),
    });
  });
  
  socket.on('typing:start', (room) => {
    socket.to(room).emit('typing:start', { user: socket.id });
  });
  
  socket.on('typing:stop', (room) => {
    socket.to(room).emit('typing:stop', { user: socket.id });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', connections: io.engine.clientsCount });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = { app, server, io };`;
}
