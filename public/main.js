var socket = io();

var form = document.getElementById('chat-form');
var input = document.getElementById('input');

// Search Username and Room from the URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
console.log(username, room)

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Stops page from refreshing on submit
  if (input.value) { // if exists
    socket.emit('chat message', input.value); //emits the input chat value
    input.value = ''; //Empty chat
  }
});

// Join chatroom
socket.emit('joinRoom', { username, room })

// Send messages
socket.on('chat message', function (msg) {
  var newMsg = document.createElement('div'); //creates a div
  newMsg.innerHTML = `<span class="username">${msg.username}</span> <p class="chat-msg"> ${msg.text} </p>`; //inputs the message
  console.log(newMsg);
  messages.appendChild(newMsg); //adds message to the chatbox
  window.scrollTo(0, document.body.scrollHeight); //scrolls to the last message
});