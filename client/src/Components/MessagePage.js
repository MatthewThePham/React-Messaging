import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');


function ChildComponent (props)
{
    return <div>{props.message}</div>;
}

class MessagePage extends Component {
   
    state = {
        value: '',       //used for mess
        submission: false,
        children: []
    }

    componentDidMount(){

        //big meme have to bind into arrow function
        socket.on('news', data => {
            if(data ){
                this.updateArray(data);
            } 
        });

    }

    updateArray = (data) => {
        this.setState({
            children: [...this.state.children, 
                <ChildComponent message={data}></ChildComponent>
            ] 
        });
    }

    //this is for the username
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submission : true});

        console.log(this.state.value);

        //sends this to server
        socket.emit('registerUser', this.state.value)
    }

    //this is for messages
    handleSubmitMessage = (e) => {
        e.preventDefault();

        console.log(this.state.value);
    
        this.setState({
            children: [...this.state.children, 
                <ChildComponent message={"You: " + this.state.value}></ChildComponent>
            ] 
        });

        //sends this to server
        socket.emit('sendMessage', this.state.value)
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

            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                    variant="outlined"
                    multiline
                    rows="4"
                    required fullWidth
                    name="multiline"
                    label="User name"
                    id="Multiline"
                    onChange={this.handleChange}
                    />
                </Grid>
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                >
                Submit
            </Button>
            </form>
            :
            <form noValidate onSubmit={this.handleSubmitMessage}>

            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                    variant="outlined"
                    multiline
                    rows="4"
                    required fullWidth
                    name="multiline"
                    label="Message"
                    id="Multiline"
                    onChange={this.handleChange}
                    />
                </Grid>
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                >
                Send Message
            </Button>

            <div>
                {this.state.children}
            </div>

            </form>
            }

        </div>
        )
    }
}

export default MessagePage;
