import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppIcon from '../images/logo.png';
import { Link } from 'react-router-dom';
import themeFile from '../util/Theme';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// REDUX
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const useStyles = makeStyles(themeFile);

function Signup(params) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [handle, setHandle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUserData = {
            email: {email}.email,
            password: {password}.password,
            confirmPassword: {confirmPassword}.confirmPassword,
            handle: {handle}.handle
        };

        params.signupUser(newUserData, params.history);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleHandleChange = (e) => {
        setHandle(e.target.value)
    }

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img className={classes.logo} src={AppIcon} alt="LogoReact" />
                <Typography variant="h3" className={classes.pageTitle}>Signup</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            autoFocus
                            id="handle"
                            label="Handle"
                            name="handle"
                            type="text"
                            autoComplete="current-password"
                            value={handle}
                            className={classes.textField}
                            onChange={handleHandleChange}
                            fullWidth
                            helperText={params.UI.error.handle}
                            error={params.UI.error.handle ? true : false}
                        />  
                    </div>
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
                    <div>
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="current-password"
                            value={confirmPassword}
                            className={classes.textField}
                            onChange={handleConfirmPasswordChange}
                            fullWidth
                            helperText={params.UI.error.confirmPassword}
                            error={params.UI.error.confirmPassword ? true : false}
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
                    >Signup
                    {params.UI.loading && (
                        <CircularProgress size={27} className={classes.progress} />
                    )}
                    </Button> <br />
                    <small>Already have an account? <Link to="/login">Login</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

signupUser.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) =>( {
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionToProps)(Signup);