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
    };

  createChildComp = (data) =>{
    this.setState({
        childern: this.state.children.concat(
            <ChildComponent message={this.state.value}></ChildComponent>
        )
    });
  }

  componentDidMount(){
    //test to see if server connects
    socket.on('news', function (data) {
        console.log(data);
    });
      
    }

    //this is for the username
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submission : true});
        console.log(this.state.value);

        socket.emit('registerUser', this.state.value)
        this.setState({ valye : ''});

    }

    //this is for messages
    handleSubmitMessage = (e) => {
        e.preventDefault();
        this.createChildComp(this.state.value)
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
            </form>
            }

            <div>
                {this.state.children}
            </div>
        </div>
        )
    }
}

export default MessagePage;
