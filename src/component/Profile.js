import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetalis from './EditDetalis';
import MyButton from '../util/MyButton';

// REDUX
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ContactlessIcon from '@material-ui/icons/Contactless';
import EditIcon from '@material-ui/icons/Edit';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const useStyles = makeStyles({
    card: {
        height: 'auto',
        padding: 5,
        borderRadius: 7,
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: 7
    },
    content: {
        padding: 25,
        paddingTop: 0,
        objectFit: 'cover'
    },
    username: {
        textAlign: 'center',
        marginLeft: 'auto',
        display: 'block'
    },
    wrapper: {
        position: 'relative'
    },
    editIcon: {
        position: 'absolute',
        bottom: -20,
        right: 0,
        
    },
    logout: {
        marginTop: 25,
        marginBottom: 0,
        fontVariant: 'all-small-caps',
        float: 'left'
    }
});

function Profile(params) {
    const classes = useStyles();
    const { credentials: { imageUrl, handle, location, bio, website, createdAt } } = params.user
    let profileMarkup;

    const handleImageChange = (e) => {
        let image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        params.uploadImage(formData);
        console.log('image: ', image);
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
        console.log('params input: ', params);
    }

    const handleLogout = () => {
        params.logoutUser();
    }

    if(!params.user.loading) {
        if(params.user.authenticated) {
            profileMarkup = (
                <Card className={classes.card}>
                    <CardContent className={classes.wrapper}>
                        <img className={classes.image} src={imageUrl} alt="" />
                        <input 
                            type="file" 
                            id="imageInput"
                            name="image" 
                            onChange={handleImageChange}  
                            hidden="hidden"
                            />
                        <MyButton tip="Edit profile" onClick={() => handleEditPicture()} btnClassName="classes.editIcon">
                            <EditIcon color="primary" />
                        </MyButton>
                    </CardContent>
                    <CardContent className={classes.content}>
                        <Typography className={classes.username} color="primary" variant="h5" component={Link} to={`/users/${handle}`} color="primary">{handle}</Typography> 
                        {
                            bio && (
                                <Fragment>
                                    <br/>
                                    <ContactlessIcon color="primary" variant="h5"/> <span>{bio}</span>
                                </Fragment>
                            )
                        } 
                        {
                            location && (
                                <Fragment>
                                    <br/>
                                    <LocationOnIcon color="primary" variant="h5"/> <span>{location}</span>
                                </Fragment>
                            )
                        } 
                        {
                            website && ( 
                                <Fragment>
                                    <br/>
                                    <LanguageIcon color="primary" variant="h5"/> <a>{website}</a>
                                </Fragment>
                            )
                        } 
                        {
                            createdAt && (
                                <Fragment>
                                    <br/>
                                    <CalendarTodayIcon color="primary" variant="h5"/> <span>Join sience {dayjs(createdAt).format('MMM YYYY')}</span>
                                </Fragment>
                            )
                        } <hr/>
                            <MyButton tip="Logout" onClick={handleLogout} btnClassName="classes.logout">
                                <MeetingRoomIcon color="primary" />
                            </MyButton>
                        <EditDetalis />
                    </CardContent>
                </Card>
            )
        } else {
            profileMarkup = (
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                    No profil found, please <Typography variant="body3"color="primary" component={Link} to={`/login`}>Login</Typography> <br/>
                    or <Typography variant="body3"color="primary" component={Link} to={`/signup`}>Signup</Typography>
                    </CardContent>
                </Card>
            )
        }
    } else {
        profileMarkup = <p>loading .....</p>
    }

    return (profileMarkup)
}

// Profile.propTypes = {
//     user: PropTypes.object.isRequired,
//     UI: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
   user: state.user,
});

const mapActionToProps = ({
    logoutUser,
    uploadImage
})

export default connect(mapStateToProps, mapActionToProps)(Profile);