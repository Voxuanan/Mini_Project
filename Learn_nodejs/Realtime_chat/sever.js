const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Chat bot";

app.use(express.static(path.join(__dirname, "public")));

// socket.emit() dùng cho client thực hiện
// socket.broadcast.emit() dùng cho all client trừ client thực hiện
// io.emit() dùng cho all client

io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        socket.emit("message", formatMessage(botName, "Welcome to chat room"));
        socket.broadcast
            .to(user.room)
            .emit("message", formatMessage(botName, `${user.username} has joined chat room`));

        io.to(user.room).emit("roomUsers", { users: getRoomUser(user.room), room: user.room });
    });

    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            io.emit("message", formatMessage(botName, `${user.username} has left the chat room`));
        }
        io.to(user.room).emit("roomUsers", { users: getRoomUser(user.room), room: user.room });
    });
});

const port = 3000 || process.env.PORT;

server.listen(port, () => console.log(`Server listening on port: http://localhost:${port}`));
