import React, {Component} from 'react';
import MessagePage from './MessagePage'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class RootPage extends Component {
    state = {
        submission: false,
        room: '',

        roomError:false,
        roomErrorMessage:'',
    }
    

    //this is for the room ID
    handleSubmit = (e) => {
        e.preventDefault();

        var error = {
            nameError:false,
            nameErrorMessage:'',
        }

        //white space check
        if( !this.state.room.length){
            error.nameError = true;
            error.nameErrorMessage = "Please enter an ID"
        }

        this.setState({ 
            roomError : error.nameError,
            roomErrorMessage : error.nameErrorMessage
        });

        if(!error.nameError){
            this.setState({
                submission: true
            });
        }
    }

    //this is for checking if user press Enter on Room ID page
    handleKeyPress = (e) => {
        if( e.key == 'Enter'){
            this.handleSubmit(e)
        }
    }

    //automatically updates user input 
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

                    <Grid container style={{paddingTop:"5%"}} justify="center">
                        <Grid item xs={6} >
                            <TextField
                            variant="outlined"
                            required fullWidth
                            name="roomId"
                            label="Enter a room ID"
                            onKeyPress={this.handleKeyPress}
                            error={this.state.roomError}
                            helperText={this.state.roomErrorMessage}
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
                </div>
                :
                <MessagePage roomVal={this.state.room}></MessagePage>
                }
            </div>
        )
    }

}

export default RootPage;


