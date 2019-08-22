const express = require('express');
const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var connectCounter=0;
const users= {}

//Used to send email api to the server
app.get('/get', (req, res, next) => {
    //var email_api = require('./routes/mailer');
    //app.use('/',email_api);
    var tempMessage = 'Number of users : ' + connectCounter;
    
    res.send({ express: tempMessage });
    console.log('Connected to react')
    next();

});


io.on('connection', function (socket) {
    var addedUser = false;
   // socket.emit('news', "Hello world");

    socket.on('sendMessage', function (data) {
      console.log(data);

      socket.broadcast.emit('news', data);
    });


    socket.on('registerUser', function (data) {
        if (addedUser) return;

        console.log("New user online");
        connectCounter++;
        socket.username = data;
        let tempData = socket.username + " Has Joined"

        socket.broadcast.emit('news', tempData);
        addedUser=true;
    });

    //why doesnt disconnect work?
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