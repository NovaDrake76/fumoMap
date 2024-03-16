const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173", // Adjust this to your frontend's origin
        methods: ["GET", "POST"]
    }
});


console.log(process.env.MONGO_URI)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => res.send('Game Server Running'));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('shipMovement', (data) => {
        console.log('Ship Movement:', data);
        // Handle ship movement logic here
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
