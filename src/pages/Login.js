import React, { useState, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppIcon from '../images/logo.png';
import { Link } from 'react-router-dom';
import themeFile from '../util/Theme';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// REDUX
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const useStyles = makeStyles(themeFile);

function Login(params) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // const [userState, userDispatch] = useReducer(params.loginUser, params.user);
    // console.log('User :', userState);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            email: {email}.email,
            password: {password}.password
        };
        params.loginUser(userData, params.history)
        
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }


    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img className={classes.logo} src={AppIcon} alt="LogoReact" />
                <Typography variant="h3" className={classes.pageTitle}>Login</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <div>
                        <TextField 
                            label="Email"
                            name="email"
                            id="email"
                            type="text"
                            className={classes.textField}
                            email={email}
                            onChange={handleEmailChange}
                            fullWidth
                            autoFocus
                            helperText={params.UI.error.email}
                            error={params.UI.error.email ? true : false}
                        /> 
                    </div>
                    <div>
                        <TextField
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            className={classes.textField}
                            onChange={handlePasswordChange}
                            fullWidth
                            helperText={params.UI.error.password}
                            error={params.UI.error.password ? true : false}
                        />  
                    </div>
                    {params.UI.error.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {params.UI.error.general}
                        </Typography>
                    )}
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary"
                        className={classes.button}
                        disabled={params.UI.loading}
                    >Login
                    {params.UI.loading && (
                        <CircularProgress size={27} className={classes.progress} />
                    )}
                    </Button> <br />
                    <small>Don't have an account? <Link to="/signup">Signup</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionToProps)(Login);