var socket = io();
// var name = '<%- JSON.stringify(username) %>'; //cuz page is just a sting when rendered so need to stringify and parse again later

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // So that page doesn't refresh on submitting the form
    if (input.value) { // if exists
        socket.emit('chat message', input.value); //
        input.value = ''; //Empty chat
    }
});
socket.on('chat message', function (msg) {
    var newMsg = document.createElement('div');
    newMsg.classList.add("msg")
    newMsg.innerHTML = '<p class= "txt">' + msg + '</p>';
    messages.appendChild(newMsg);
    window.scrollTo(0, document.body.scrollHeight);
});