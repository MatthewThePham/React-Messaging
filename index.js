const express = require('express');
const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//total # of users
var connectCounter = 0;

//needed to store all rooms ID, and # of users in each room
var roomMap = new Map();

//Used to send total number of users from api to react get request
app.get('/getTotalUsers', (req, res, next) => {

    var tempMessage = 'Total Number of Users : ' + connectCounter;
    res.send({ express: tempMessage });

    //console.log('Connected to react')
    next();
});

//Used to get local amount of users in a room
app.get('/getUsersInRoom/:idRoom', (req, res) => {
  var tempString = '1'

  if(roomMap.has(req.params.idRoom)){
    tempString = roomMap.get(req.params.idRoom).val
  }

  var tempMessage = 'Users In Room : ' + tempString;
  //console.log(tempMessage + "for room " + req.params.idRoom);
  res.send({ express: tempMessage });

});


//when user connects via socket io client on react
io.on('connection', function (socket) {
  
  var addedUser = false;
  
  //when creating a new room, add to global roomMap and set occupants to zero
  socket.on('room', function(room) {
    console.log("Room Made: " + room);

    if(roomMap.has(room)){
      socket.join(room);      
    }
    else{
      roomMap.set(room, {val: 0});
      socket.join(room);      
    }
  });

  socket.on('sendMessage', function (data) {
    console.log(socket.username + " :: " + data);

    //recieves client data, and sends through "news" socket to other clients
    socket.broadcast.to(socket.room).emit('news',  socket.username + " :: " + data);
  });


  socket.on('registerUser', function (data, room) {
      if (addedUser) return;

      console.log("New user online");
      connectCounter++;
      roomMap.get(room).val++;

      //each socket.username will be independent and seperate from each user session
      socket.username = data;
      socket.room = room;
      let tempData = socket.username + " Has Joined"

      socket.broadcast.to(room).emit('news', tempData);
      addedUser = true;
  });

  
  socket.on('disconnect', function() { 
    if (addedUser){
      connectCounter--; 
      roomMap.get(socket.room).val--

    //if # of users is zero, then delete it from the roomMap
    if(roomMap.get(socket.room).val === 0){
        roomMap.delete(socket.room)
        console.log('The room ' + socket.room + " has been deleted.")
    }
      
    socket.broadcast.to(socket.room).emit('news', socket.username + " Has Disconnected");
    }
  });

});

const port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log(`Listening on ${port}`)
});