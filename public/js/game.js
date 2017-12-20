var socket = io();


socket.on('new player', function(msg){
   console.log("New player connected");
   console.log(msg);
  });