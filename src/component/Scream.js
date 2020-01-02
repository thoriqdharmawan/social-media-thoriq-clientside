import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'


// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

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

export default function Scream(props) {
   dayjs.extend(relativeTime);
   const classes = useStyles();
   const { userHandle, body, createdAt, userImage, screamId, likeCount, commentCount } = props.scream

   return (
      <Card className={classes.card}>
         <Avatar className={classes.image} alt="Profile" src={userImage} />
         <CardContent className={classes.content}>
            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
            <Typography className={classes.time} variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
            <Typography variant="body1">{body}</Typography>
         </CardContent>
      </Card>
   )
}