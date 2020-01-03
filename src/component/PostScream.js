import React, { useState } from 'react';

import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    cardPost: {
        padding: '23px 23px 0px 23px',
        height: 'auto',
        marginBottom: '15px'
    },
    fieldPost: {
        width: '100%'
    },
    postNow: {
        float: 'right'
    }
 })

const PostScream = (params) => {
    const classes = useStyles();
    const [body, setBody] = useState('');

    const handleSendPost = (e) => {
        e.preventDefault();
        const newScream = {
            body: body
        }

        params.postScream(newScream);
    }
    
    const handleChangePost = (e) => {
        e.preventDefault();
        setBody(e.target.value);
    }

    const { UI: { loading, error } } = params
    return (
        <Card className={classes.cardPost}>
            <form onSubmit={handleSendPost}>
                <TextField 
                    className={classes.fieldPost} 
                    id="outlined-basic" 
                    label="Post anythings" 
                    variant="outlined" 
                    multiline
                    rows="4" 
                    value={body}
                    onChange={handleChangePost}
                />
                <div className={classes.postNow}>
                    <Button type="submit" variant="contained" disabled={loading}>
                        <SendIcon color="primary" />
                    </Button>
                </div>
            </form>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

export default connect(mapStateToProps, { postScream })(PostScream);