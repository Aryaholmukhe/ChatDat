var socket = io();
// var name = '<%- JSON.stringify(username) %>'; //cuz page is just a sting when rendered so need to stringify and parse again later

var form = document.getElementById('chat-form');
var input = document.getElementById('input');
// Search Username and Room from the URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  console.log(username, room)

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Stops page from refreshing
    if (input.value) { // if exists
        socket.emit('chat message', input.value); //
        input.value = ''; //Empty chat
    }
});
  
  // Join chatroom
  socket.emit('joinRoom', {username, room})

socket.on('chat message', function (msg) {
    var newMsg = document.createElement('div');
    newMsg.innerHTML = `<span class="username">${msg.username}</span> <p class="chat-msg"> ${msg.text} </p>`;
    console.log(newMsg);
    messages.appendChild(newMsg);
    window.scrollTo(0, document.body.scrollHeight);
});