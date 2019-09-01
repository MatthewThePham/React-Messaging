import React, {Component} from 'react';
import MessagePage from './MessagePage'

import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//use this page to either pick
//Join room
//Create room
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');


class RootPage extends Component {
    state = {
        submission: false,
        room: "",
    }
    
    //this is for the username
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submission: true
        });

       // socket.emit('room', this.state.room)
    }


    handleChange = event => {
        this.setState({ room : event.target.value});
    };


    render(){
        return (
            <div>
                {
                ! this.state.submission
                ?
                <div>
                    <form noValidate onSubmit={this.handleSubmit}>

                    <Grid container style={{paddingTop:"5%"}} justify="center" spacing={2}>
                        <Grid item xs={6} >
                            <TextField
                            variant="outlined"
                            multiline
                            required fullWidth
                            name="multiline"
                            label="Please enter a room number"
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
                </div>
                :
                <MessagePage roomVal={this.state.room}></MessagePage>
                }
            </div>
        )
    }

}

export default RootPage;


