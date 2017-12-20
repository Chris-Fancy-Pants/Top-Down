var express = require('express');
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var players = [];
app.use(express.static('public'))
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/js/game.js', function(req, res){
//     res.sendFile(__dirname + '/public/js/game.js');
//   });

io.on('connection', function(socket){
  console.log('a user connected');
  var new_player = new Object();
  new_player.id = socket.id;
  players.push(new_player);
  console.log(players[0].id)
  socket.emit('new player', players);

  socket.on('player joined', function(p){
    updatePlayer(socket, p);
  });


});

function updatePlayer(socket, playerInfo) {

  for(var i = 0; i < players.length; i++) {
    if(players[i].id === socket.id) {
      players[i].x = playerInfo.x;
      players[i].y = playerInfo.y;
    }
  }

}

setInterval(GameBroadcast, 1000/30);

function GameBroadcast() {
  io.emit('gameBroadcast', players);
}

http.listen(3000, function(){
  console.log('listening on *:3000 yo');
});




