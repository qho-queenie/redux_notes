// all the slices need to be registered here
import { configureStore } from '@reduxjs/toolkit'

// everytime we create a new slice, we need to add its reducer function to the store
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

// update configureStore so the slice we just created 'postsReducer' is passed in as a reducer field name (posts)
// all the data for state.posts will be updated by the postsReducer function via dispatch

// our top-level state object to have a field named 'posts' and also a 'users'
export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  }
})
