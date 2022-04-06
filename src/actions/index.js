import _ from 'lodash'
import jsonPlaceholder from "../apis/jsonPlaceholder"


//AS A GENERAL NOTE, YOU WANT ACTION CREATORS TO BE AS SHORT & COMPACT AS POSSIBLE


export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts()) // manually dispatching this function, brings that action creator
    // redux thunk and get invoked with dispatch
    
    //these are big helps from lodash, and this is refactored below
    // const userIDs = _.uniq(_.map(getState().posts, 'userId'))
    // userIDs.forEach(id => dispatch(fetchUser(id)))

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value() // this starts the lodash chain, sort of like an execute command
}

export const fetchPosts = () => {

    // async/await throws off the simplicity we previously addressed. 
    // because of the asynchronousness, the action is sent to reducer BEFORE data is fetched from api

    // const response = await jsonPlaceholder.get('/posts')

    // writing a function that returns a function -- very common for React-Redux apps
    return async dispatch => {
        // dispatch allows you to change any data in the app that you want
        // getState (which was deleted after a re-factor) allows us to read or otherwise view any data
        const response = await jsonPlaceholder.get('/posts')

        // we don't need to return an action since this is using redux-thunk. 
        // instead, we invoke dispatch
        // so what once was just:
        // return {
        //     type: 'FETCH_POSTS',
        //     payload: response
        // }
        // is now (with added . method to grab only the data rather than the whole response): 
        dispatch({ type: 'FETCH_POSTS', payload: response.data })
    }
    }

// cleaner way to write everything above:
// export const fetchPosts = () => async dispatch => {
//     const response = await jsonPlaceholder.get('/posts')
//     dispatch({ type: 'FETCH_POSTS', payload: response.data })
// }

// export const fetchUser = (id) => async dispatch => {
//   _fetchUser(id, dispatch)
// }

// //lodash memoize makes it such that there is only ONE api request per user, rather than one per post
// // i think it kinda stores stuff in it like a temporary package
// // this would prevent you from refetching any user data after the first time
//     // the solution to that would be to create another function similar to below but without memoize stuff
// const _fetchUser = _.memoize(async (id, dispatch) => {
//       // fetchUser creates a branch new function EVERY SINGLE TIME it's called
//       const response = await jsonPlaceholder.get(`/users/${id}`)
     
//       dispatch({ type: 'FETCH_USER', payload: response.data})
// })

// this is a refactor of the stuff above, but still making 100 calls for 100 posts
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`)
   
    dispatch({ type: 'FETCH_USER', payload: response.data})
}