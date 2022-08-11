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

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

let user= [];

// We define a route handler '/' that gets called when we hit our website home.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); //sends the html from defined file
});
// app.get('/login', (req, res) => {
//   res.render("login");
// });

// app.post('/login', (req, res) => {
//   user.push(req.body.user);
//   console.log(user);
//   res.redirect("/");
// })

io.on('connection', (socket) => {
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.broadcast.emit('chat message', "a new user has joined")

  socket.on('disconnect', () => {
    io.emit("A user left the chat");
  });

});
 

// sets the server to listen on port 3000
server.listen(3000, () => {
  console.log('listening on port 3000');
});