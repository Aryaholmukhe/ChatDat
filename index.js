// Express initializes app and makes the server
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const formatMessage = require("./utils/formatMessage");
const { joinUsers, getUser, leftUser } = require("./utils/users");

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));  //lets u use static files

app.use(bodyParser.json());


// We define a route handler '/' that gets called when we hit our website home.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); //sends the html from defined file
});

// every time there is a connection
io.on('connection', (socket) => {

  // when specific room is joined
  socket.on('joinRoom', ({ username, room }) => {
    const user = joinUsers(socket.id, username, room);
    socket.join(user.room)
    // sends the message to chatbox // .to() sends in the specific room // broadcast method sends to everyone except you
    socket.broadcast.to(user.room).emit('chat message', formatMessage("", `${user.username} has joined`))
  })

  // when sending texts
  socket.on('chat message', (msg) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('chat message', formatMessage(user.username, msg));
  });

  //when disconnected
  socket.on('disconnect', () => {
    const user = leftUser(socket.id);
    if (user) { //if left user existed then send disconnect message
      io.to(user.room).emit('chat message', formatMessage("", `${user.username} has left`));
    }
  });
});

// sets the server to listen on port 3000
server.listen(3000, () => {
  console.log('listening on port 3000');
});