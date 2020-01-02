import React, { Component } from 'react';
import axios from 'axios';

// ==
import Scream from '../component/Scream';
import Profile from '../component/Profile';

// MUI Stuff
import Grid from '@material-ui/core/Grid';

class Home extends Component {
    state = {
        screams: null
    }

    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => {
                console.log(err)
            });
    }
    

    render() {
        let recentScreamMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ) : <p>Loading ... </p>
        return (
            <Grid container spacing={2}>
                <Grid item sm={3} xs={12}>
                    <Profile />
                </Grid>
                <Grid item sm={9} xs={12}>
                    {recentScreamMarkup}
                </Grid>
            </Grid>
        );
    }
}

export default Home;