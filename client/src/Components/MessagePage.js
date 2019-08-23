import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import Grow from '@material-ui/core/Grow';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

//added keys for list, react needs key to keep track of array items relative to dom
//https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements/51428373



class MessagePage extends Component {
   
    state = {
        value: '',       //used for mess
        submission: false,
        children: [],
        childIndex:0,
    }

    componentDidMount(){

        //big meme have to bind into arrow function for inner function to work
        // ie using keyword "this" on a function

        socket.on('news', data => {
            if(data ){
                this.updateArray(data);
            } 
        });

    }

    updateArray = (data) => {
        this.setState({
            children: [...this.state.children, data] 
        });

    }

    //this is for the username
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submission : true});

        console.log(this.state.value);

        //sends this to server
        socket.emit('registerUser', this.state.value)

        //clears message
        this.setState({ value : ""});
    }

    //this is for messages
    handleSubmitMessage = (e) => {
        e.preventDefault();

        console.log(this.state.value);
    
        var tempMessage = "You: " + this.state.value;
        this.updateArray(tempMessage)

        //sends this to server
        socket.emit('sendMessage', this.state.value)

        //clears message
        this.setState({ value : ""});
    }

    //this is for textbox for both pages
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

            <Grid container style={{paddingTop:"5%"}} justify="center" spacing={2}>
                <Grid item xs={6} >
                    <TextField
                    variant="outlined"
                    multiline
                    required fullWidth
                    name="multiline"
                    label="User name"
                    id="Multiline"
                    onChange={this.handleChange}
                    />
                </Grid>
            </Grid>

            <Grid container style={{paddingBottom:"5%"}} justify="center" spacing={2}>
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

            <React.Fragment>
                {this.state.children.map( (home,index) => 
                    <li key={index} style={{paddingTop:"1%"}} >
                        {home}
                    </li>
                )}
            </React.Fragment>

            <Grid container style={{paddingTop:"5%"}} justify="center" spacing={2}>
                <Grow in={true} timeout={1000} >
                    <Grid item xs={10} >
                        <TextField
                        variant="outlined"
                        multiline
                        rows="4"
                        required fullWidth
                        name="multiline"
                        label="Message"
                        id="Multiline"
                        value={this.state.value}
                        onChange={this.handleChange}
                        />
                    </Grid>
                </Grow>

            </Grid>

            <Grid container style={{paddingBottom:"5%"}} justify="center" spacing={2}>
                <Grow in={true} timeout={700} >
                    <Grid item xs={10} >
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

            
            </form>
            }

        </div>
        )
    }
}

export default MessagePage;
