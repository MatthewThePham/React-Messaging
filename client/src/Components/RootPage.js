import React, {Component} from 'react';
import MessagePage from './MessagePage'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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

                    <Grid container style={{paddingTop:"5%"}} justify="center">
                        <Grid item xs={6} >
                            <TextField
                            variant="outlined"
                            multiline
                            required fullWidth
                            name="multiline"
                            label="Enter a room ID"
                            id="Multiline"
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


