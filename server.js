const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

const app = express();
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
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

server.listen(process.env.port || 5000, () => {
    console.log("Server running");
})