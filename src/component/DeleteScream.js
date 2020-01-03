import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../util/MyButton';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

// REDUX
import { connect } from 'react-redux';
import { deleteScream, getScreams } from '../redux/actions/dataActions';

const useStyles = makeStyles({
    deleteButton: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})

const DeleteScream = (props) => {
    const [open, setOpen] = useState(false);
    
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteScream = () => {
        props.deleteScream(props.screamId);
        setOpen(false);
        console.log(props);
        props.getScreams();
    }

    return (
        <Fragment>
            <MyButton 
                tip="Delete Post"
                onClick={handleOpen}
                btnClassName={classes.deleteButton}
            >
                <DeleteOutlineIcon color="secondary" />
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle >Are you sure to delete?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >Cancle</Button>
                    <Button onClick={() => handleDeleteScream()} color="secondary" >Delete</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};



export default connect(null, {deleteScream, getScreams})(DeleteScream);