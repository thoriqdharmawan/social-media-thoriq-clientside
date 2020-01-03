import React, { Component } from 'react';

// ==
import Scream from '../component/Scream';
import Profile from '../component/Profile';

// MUI Stuff
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class Home extends Component {
    state = {
        screams: null
    }

    componentDidMount() {
        this.props.getScreams()
    }
    
    render() {
        const { screams, loading } = this.props.data;
        let recentScreamMarkup = !loading ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
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

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getScreams })(Home);