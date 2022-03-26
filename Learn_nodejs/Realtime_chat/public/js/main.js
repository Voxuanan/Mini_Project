const chatForm = document.querySelector("#chat-form");
const chatMessage = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const listUsers = document.querySelector("#users");
const socket = io();

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const outputMessage = (message) => {
    const div = document.createElement("div");
    div.classList.add("message");
    if (message.username == username) {
        div.style = "text-align: right; background-color: #ccc;";
    }
    div.innerHTML = `   <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    chatMessage.appendChild(div);
};

const outputRoomName = (room) => {
    roomName.innerText = room;
};

const outputUser = (users) => {
    listUsers.innerHTML = "";
    users.forEach((user) => {
        const li = document.createElement("li");
        li.innerText = user.username;
        listUsers.appendChild(li);
    });
};

socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUser(users);
});

socket.on("message", (message) => {
    outputMessage(message);
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit("chatMessage", msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus;
});
