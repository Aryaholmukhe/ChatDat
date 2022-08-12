// Express initializes app and makes the server
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const { urlencoded } = require("body-parser")
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const formatMessage = require("./utils/formatMessage");
const {joinUsers, getUser, leftUser} = require("./utils/users");

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());


// We define a route handler '/' that gets called when we hit our website home.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); //sends the html from defined file
});


io.on('connection', (socket) => {
  socket.on('joinRoom', ({username, room}) =>{

  const user = joinUsers(socket.id, username, room);

  socket.join(user.room) 

  socket.broadcast.to(user.room).emit('chat message', formatMessage("", `${user.username} has joined`))
  })
  socket.on('chat message', (msg) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('chat message', formatMessage(user.username, msg));
  });
  

  socket.on('disconnect', () => {
    const user = leftUser(socket.id);
    if(user){
      io.to(user.room).emit('chat message', formatMessage("",  `${user.username} has left`));
    }
  });
});
 

// sets the server to listen on port 3000
server.listen(3000, () => {
  console.log('listening on port 3000');
});