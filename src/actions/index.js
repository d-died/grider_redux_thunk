import jsonPlaceholder from "../apis/jsonPlaceholder"

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

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`)
     
    dispatch({ type: 'FETCH_USER', payload: response.data})
}
   