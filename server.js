const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
// const path = require("path")

const app = express();
app.use(cors())

const server = http.createServer(app)

// const baseUrl = "http://localhost:3000"
const baseUrl = "https://chat-room28.netlify.app"

const io = new Server(server, {
    cors: {
        origin: baseUrl,
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    // console.log(`${socket.id} connected`);

    socket.on("join_room", (data) => {
        socket.join(data)
        // console.log(`User ${socket.id} joined room ${data}`);
    })

    socket.on("send_message", (data) => {
        // console.log(data);
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        // console.log(`${socket.id} disconnected`);
    })
})

// app.get("/", (req, res) => {
//     res.send("vanakam frans")
// })
app.get("/", (req, res) => {
    res.send("Server running")
})

server.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
})