import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, CLEAR_ERRORS, SET_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/screams')
        .then((res) => {
            dispatch({ 
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ 
                type: SET_SCREAMS,
                payload: []
            })
        })
}

// POST SCREAM
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios
        .post('/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                playload: res.data
            });
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                playload: err.response.data
            })
        })
}

// Like 
export const likeScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}


// Unlike
export const unlikeScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// Delete 
export const deleteScream = (screamId) => (dispatch) => {
    axios  
        .delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({ type: DELETE_SCREAM, payload: screamId })
        })
        .catch(err => console.log(err));
}