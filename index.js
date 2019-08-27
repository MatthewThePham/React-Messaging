const express = require('express');
const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



var connectCounter = 0;

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

    socket.on('sendMessage', function (data) {
      console.log(socket.username + " :said: " + data);

      //recieves client data, and sends through "news" socket to other clients
      socket.broadcast.emit('news',  socket.username + " :: " + data);
    });


    socket.on('registerUser', function (data) {
        if (addedUser) return;

        console.log("New user online");
        connectCounter++;

        //each socket.username will be inpendent and seperate from each user session
        socket.username = data;
        let tempData = socket.username + " Has Joined"

        socket.broadcast.emit('news', tempData);
        addedUser = true;
    });

    
    socket.on('disconnect', function() { 
      if (addedUser){
        connectCounter--; 
        socket.broadcast.emit('news', socket.username + " Has Disconnected");
      }
    });
});

const port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log(`Listening on ${port}`)
});