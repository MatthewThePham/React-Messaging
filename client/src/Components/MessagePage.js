import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import openSocket from 'socket.io-client';
const socket = openSocket("/");    //openSocket('http://localhost:5000');

//added keys for list, react needs key to keep track of array items relative to dom
//https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements/51428373

class MessagePage extends Component{
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.newData = React.createRef();

        //send specific room # to server
        socket.emit('room', this.props.roomVal)
    }

    state = {
        value: '',          //used for messages to and from users
        response: '',       //show total users in a room
        submission: false,
        userNameError:false,
        userNameErrorMessage:'',
        children: [],
        childIndex:0,

        doneTransition:false
    }

    componentDidMount(){
        //have to bind into arrow function for inner function to work
        // ie using keyword "this" on a function

        socket.on('news', data => {
            if(data ){
                this.updateArray(data);    
            } 
        });

        //get total # of users in current room
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    
    componentDidUpdate(){
        //moves to the bottom of the form after pressing submit
        //is not automatically done in componentDidmount as no new dom elemnent was mounted
        if(this.el.current !== null && this.state.submission === true && this.state.doneTransition == false){
            this.el.current.scrollIntoView({ block:"center"});
            this.setState({
                doneTransition: true
            });
        }

        //updates total # of users in current room if # changes
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }
    

    //added URL paramters in req body to get specific room
    callApi = async () => {
        const response = await fetch(`/getUsersInRoom/${this.props.roomVal}`);
        const body = await response.json();
    
        //if (response.status !== 200) throw Error(response.message);
        return body;
    };

    
    //add messages (from other users and from self) into an array block
    updateArray = (data) => {
        this.setState({
            children: [...this.state.children, data] 
        });

        var out = this.newData.current;
        if(out !== null){
            out.scrollTop = out.scrollHeight - out.clientHeight
        }  
    }
    

    //this is for the username
    handleSubmit = (e) => {
        e.preventDefault();

        var error = {
            nameError:false,
            nameErrorMessage:'',
        }

        //white space check
        if( !this.state.value.length){
            error.nameError = true;
            error.nameErrorMessage = "Please enter a Username"
        }

        this.setState({ 
            userNameError : error.nameError,
            userNameErrorMessage : error.nameErrorMessage
        });


        if(!error.nameError){
            this.setState({ submission : true});

            //sends this data to server
            socket.emit('registerUser', this.state.value,this.props.roomVal)
    
            //clears message
            this.setState({ value : ""});
        }    
    }

    //this is for checking if user press Enter on username screen
    handleKeyPress = (e) => {
        if( e.key == 'Enter'){
            this.handleSubmit(e)
        }
    }

    //this is for checking if user press Enter on message page
    handleKeyPressMessage = (e) => {
        if( e.key == 'Enter'){
            this.handleSubmitMessage(e)
        }
    }

    //this is for messages submissions
    handleSubmitMessage = (e) => {
        e.preventDefault();
    
        if(this.state.value != ""){
            var tempMessage = "You: " + this.state.value;
            this.updateArray(tempMessage)
    
            //sends this data to server
            socket.emit('sendMessage', this.state.value)
    
            //clears message
            this.setState({ value : ""});
    
        }
    }

    //automically changes user input for both pages
    handleChange = event => {
        this.setState({ value : event.target.value});
    };

    render(){
        return(
        <div>
            {
            ! this.state.submission 
            ?
            <form noValidate onSubmit={this.handleSubmit}>

            <Grid container style={{paddingTop:"5%"}} justify="center">
                <Grid item xs={6} >
                    <TextField
                    variant="outlined"
                    required fullWidth
                    name="userName"
                    label="User name"
                    id="Multiline"
                    onKeyPress={this.handleKeyPress}
                    error={this.state.userNameError}
                    helperText={this.state.userNameErrorMessage}
                    onChange={this.handleChange}
                    />
                </Grid>
            </Grid>

            <Grid container style={{paddingBottom:"5%"}} justify="center">
                <Grid item xs={6} >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        >
                        Submit
                    </Button>
                </Grid>
            </Grid>

            </form>
            :
            <form noValidate onSubmit={this.handleSubmitMessage}>


            <Grid container style={{paddingTop:"2%"}} justify="center">
                <Grow in={true} timeout={1000} >
                    
                    <Paper elevation={3} ref={this.newData}  justify="center"  style={{ justify:"center", height: '30vh', width:"55%", overflow: 'auto', paddingTop:"15%", paddingBottom:"5%"}}>
                        <List>
                            <React.Fragment>
                                {this.state.children.map( (home,index) => 
                                
                                <Typography variant="subtitle1" key={index} style={{paddingBottom:"1%"}}>
                                    {home}
                                </Typography>

                                )}                           
                            </React.Fragment>
                        </List>
                    </Paper>
                    
                </Grow>
            </Grid>

            <Grid container style={{paddingTop:"2%"}} justify="center">
                <Grow in={true} timeout={1000} >
                    <Grid item xs={6} >
                        <TextField
                        variant="outlined"
                        multiline
                        rows="2"
                        required fullWidth
                        name="messageLines"
                        label="Message"
                        id="Multiline"
                        onKeyPress={this.handleKeyPressMessage}
                        value={this.state.value}
                        onChange={this.handleChange}
                        />
                    </Grid>
                </Grow>
            </Grid>

            <Grid container style={{paddingBottom:"2%"}} justify="center">
                <Grow in={true} timeout={700} >
                    <Grid item xs={6} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            >
                            Send Message
                        </Button>
                    </Grid>
                </Grow>
            </Grid>

            <div>{this.state.response}</div>

            <div ref={this.el} > </div>

            </form>
            }
        </div>
        )
    }
}

export default MessagePage;
