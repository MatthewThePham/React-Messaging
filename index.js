const express = require('express');
const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var connectCounter = 0;

//needed to store all rooms ID, and # of users in each room
var roomMap = new Map();

//if # of users is zero, then delete it from the roomMap


//Used to send total number of users from api to react get request
app.get('/get', (req, res, next) => {

    var tempMessage = 'Number of users : ' + connectCounter;
    res.send({ express: tempMessage });

    //console.log('Connected to react')
    next();

});

//when user connects via socket io client on react
io.on('connection', function (socket) {
    
  var addedUser = false;
  
  socket.on('room', function(room) {
    console.log(room);

    if(roomMap.has(room)){
      socket.join(room);      
    }
    else{
      roomMap.set(room,{val: 0});
      socket.join(room);      
    }

  });

  socket.on('sendMessage', function (data) {
    console.log(socket.username + " :: " + data);

    //recieves client data, and sends through "news" socket to other clients
    //socket.emit('news',  socket.username + " || " + data);
    socket.broadcast.to(socket.room).emit('news',  socket.username + " :: " + data);
  });


  socket.on('registerUser', function (data,room) {
      if (addedUser) return;

      console.log("New user online");
      connectCounter++;
      roomMap.get(room).val++;

      //each socket.username will be inpendent and seperate from each user session
      socket.username = data;
      socket.room = room;
      let tempData = socket.username + " Has Joined"
      let totalNumInRoom = "Total Users In Room: " + roomMap.get(room).val

      socket.broadcast.to(room).emit('news', tempData);
      socket.broadcast.to(room).emit('news', totalNumInRoom);
      addedUser = true;
  });

  
  socket.on('disconnect', function() { 
    if (addedUser){
      connectCounter--; 
      roomMap.get(socket.room).val--

      //checks if a room has no users, then remove it from the map
      if(roomMap.get(socket.room).val === 0){
        roomMap.delete(socket.room)
      }
      
      socket.broadcast.to(socket.room).emit('news', socket.username + " Has Disconnected");

    }
  });

});

const port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log(`Listening on ${port}`)
});