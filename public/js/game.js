var socket = io();

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');






socket.on('new player', function(msg){
   console.log("New player connected");
   console.log(msg);
   joinGame()
  });

function joinGame() {
  var player = new Object();
  player.x = Math.random() * canvas.width;
  player.y = Math.random() * canvas.height;

  socket.emit('player joined', player);
}