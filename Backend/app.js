const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const cors = require('cors');
const http = require('http').Server(app);
const userRoute = require('./Routes/userRoute');
const storyRoute = require('./Routes/storyRoute');
const characterRoute = require('./Routes/characterRoute');
const PORT = process.env.PORT;

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoute);
app.use("/api/auth", storyRoute);
app.use("/api/auth", characterRoute);

// socket code below
socketIO.on('connection', async (socket) => {
    console.log(`${socket.id} user connected`);

    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
        console.log(data);
      });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(PORT, () => {
    try{
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('DB Connection Successful')
        })
        .catch((err) => {
            console.error(err.message);
        });
        console.log(`Server listening on ${PORT}`);
    }
    catch(error) {
        console.log('Server could not be started. Please try again...')
    }
});