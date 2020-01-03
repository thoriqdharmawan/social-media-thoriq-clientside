import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../util/MyButton';

// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// ICONS
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// REDUX
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

const useStyles = makeStyles({
   card: {
      display: 'flex',
      marginBottom: 10,
   },
   image: {
      marginTop: 25,
      marginLeft: 25,
   },
   content: {
      padding: 16,
      objectFit: 'cover'
   },
   time: {
      marginTop: -7,
      marginBottom: 7
   }
})

function Scream(props) {
   dayjs.extend(relativeTime);
   const classes = useStyles();
   const { 
      scream: {
         userHandle, 
         body, 
         createdAt, 
         userImage, 
         screamId, 
         likeCount, 
         commentCount
      },
      user: {
         authenticated
      }
   } = props
   const likedScream = () => {
      if(props.user.likes && props.user.likes.find(like => like.screamId === props.scream.screamId)) {
         return true 
      } else {
         return false
      }
   }

   const likeScream = () => {
      props.likeScream(props.scream.screamId);
   }

   const unlikeScream = () => {
      props.unlikeScream(props.scream.screamId);
   }

   const likeButton = !authenticated ? (
      <MyButton tip="Like">
         <Link to="/login">
            <FavoriteBorderIcon color="primary" />
         </Link>
      </MyButton>
   ) : (
      likedScream() ? (
         <MyButton tip="Unlike" onClick={unlikeScream} >
            <FavoriteIcon color="primary" />
         </MyButton>
      ) : (
         <MyButton tip="Like" onClick={likeScream} >
            <FavoriteBorderIcon color="primary" />
         </MyButton>
      )
   )

   return (
      <Card className={classes.card}>
         <Avatar className={classes.image} alt="Profile" src={userImage} />
         <CardContent className={classes.content}>
            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
            <Typography className={classes.time} variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
            <Typography variant="body1">{body}</Typography>
            {likeButton}
            <span>{likeCount} Likes</span>
            <MyButton tip="Comments">
               <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} Comments</span>
         </CardContent>
      </Card>
   )
}

const mapStateToProps = (state) => ({
   user: state.user,
});

const mapActionsToProps = {
   likeScream,
   unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(Scream);