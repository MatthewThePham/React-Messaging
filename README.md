----
## React Messaging App

![GIFofWebsiteUse](https://gitlab.com/MatthewPh/react-socketio/raw/master/client/src/howToSocket.gif)


----
### General questions

* What technologies were used?

> This website uses React for the frontend client. React router rom is used to switch pages. Material UI is used for general GUI objects. 

> Express and Socket IO are used for the backend.  Socket IO allows for easy real time data transfer between clients. 
> The backend and frontend were written in Javascript.

* Features?

> 
1. Real time Messaging with custom usernames.
1. Private rooms which can be shared for joining.
1. Auto empty room deletion.
1. Connection and Disconnection message relative to room.
1. Shows total number of people chatting. (In a room)
1. Local number of people in room.



* Purpose of website?

> Mainly for experimenting with real time data in web apps. This also could be further expanded for a game. 


----
### Local testing

* Which commit?

> The local host commit will be this: https://gitlab.com/MatthewPh/react-socketio/tree/25fe8bb1f49ec2618ccad50d9194b32c4cf288a2


* How to run Local Test?

> 
1. Make sure you have NodeJS installed as well as Yarn package manager. 
1. The outermost folder is the express server, and the "client" folder is the frontend. They will both have separate modules.
1. Now we install dependencies for our frontend and backend.
1. Change directory into outermost folder and run, "yarn add express" for the backend.
1. Change to the client folder and run, "yarn add @material-ui/core". Also run "yarn add react-router-dom".
> 1. Now we just need to run our web app!
1.  Change directory into outermost folder and run "yarn start" to run the start script in the server. This should run on localhost 5000.
1. Open a new terminal and change to the client folder. Run the command "yarn start" to start the React client. This should run on localhost 3000.
1. Test away!

