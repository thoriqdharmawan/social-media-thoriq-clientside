import React, { useState, useEffect } from 'react';
import { editUserDetails } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import themeFile from '../util/Theme';
import { makeStyles } from '@material-ui/core/styles';

// MUI
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    edit: {

    }
});

const EditDetalis = (params) => {
    const classes = useStyles();
    const [bioS, setBio] = useState('');
    const [websiteS, setWebsite] = useState('');
    const [locationS, setLocation] = useState('');
    const [openS, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        mapUserDetailsToState();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const mapUserDetailsToState = () => {
        setWebsite(params.user.credentials.website);
        setBio(params.user.credentials.bio);
        setLocation(params.user.credentials.location);
    }

    useEffect(() => {
        mapUserDetailsToState();
    }, [1])

    const handleChangeBio = (e) => {
        setBio(e.target.value);
    }
    const handleChangeWebsite = (e) => {
        setWebsite(e.target.value);
    }
    const handleChangeLocation = (e) => {
        setLocation(e.target.value);
    }

    const handleSubmit = () => {
        const userDetails = {
            bioS,
            websiteS,
            locationS
        }

        params.editUserDetails(userDetails);
        handleClose();
        console.log('params.user: ', params.user);
    }

    return (
        <div>
            <Tooltip title="Edit Details" >
                <Fab size="small" className={classes.editIcon} aria-label="edit">
                    <EditIcon onClick={() => handleOpen()} className={classes.edit} />
                </Fab>
            </Tooltip>
            <Dialog
                open={openS}
                onClose={() => handleClose()}
                maxWidth='sm'>
                    <DialogTitle>Edit Details</DialogTitle>
                    <DialogContent>
                        <form action="">
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short bio yourself"
                                className={classes.textField}
                                value={bioS}
                                onChange={handleChangeBio}
                                fullWidth 
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                multiline
                                rows="3"
                                placeholder="Your website"
                                className={classes.textField}
                                value={websiteS}
                                onChange={handleChangeWebsite}
                                fullWidth 
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                multiline
                                rows="3"
                                placeholder="Where your location?"
                                className={classes.textField}
                                value={locationS}
                                onChange={handleChangeLocation}
                                fullWidth 
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} color="primary">Cancle</Button>
                        <Button onClick={() => handleSubmit()} color="primary">Save</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps, { editUserDetails})(EditDetalis);