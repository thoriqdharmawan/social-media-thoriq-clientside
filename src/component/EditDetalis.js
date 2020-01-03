import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../util/MyButton';
// Redux
import { editUserDetails } from '../redux/actions/userActions';
// MUI\
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    // edit: {
    //     float: 'right'
    // },
    editIcon: {
        float: 'right',
        marginTop: '25px'
    },
    textField: {
        marginBottom: '10px'
    }
});

const EditDetalis = (params) => {
    const classes = useStyles();
    const [bioS, setBio] = useState('');
    const [websiteS, setWebsite] = useState('');
    const [locationS, setLocation] = useState('');
    const [openS, setOpen] = useState(false);

    const mapUserDetailsToState = () => {
        setWebsite(params.user.credentials.website);
        setBio(params.user.credentials.bio);
        setLocation(params.user.credentials.location);
    }

    const handleOpen = () => {
        setOpen(true);
        mapUserDetailsToState();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChangeBio = (e) => {
        setBio(e.target.value);
        console.log('bios : ', bioS);
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
            <MyButton tip="Edit details" onClick={() => handleOpen()} btnClassName="classes.editIcon">
                <EditIcon color="primary" />
            </MyButton>
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