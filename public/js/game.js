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

socket.on('gameBroadcast', function(msg){

  for(var i = 0; i<msg.length; i++) {
    ctx.beginPath();
    ctx.arc(msg[i].x, msg[i].y, 50, 0, Math.PI * 2, true);
    ctx.stroke();
  }


});