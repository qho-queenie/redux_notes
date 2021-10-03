// this component is for that takes an ID and returns the name of the user
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUserById } from '../users/usersSlice'

export const PostAuthor = ({ userId }) => {
    const userById = useSelector(state => selectUserById(state, userId));

    // even we only called fetchUsers once in the index.js, the results live in the store(state)
    // so we can access the users from a selector
    // then why cant we do the same with posts? Without having to set posts from fetchPosts?

    // we no longer have to get all the users and find it thru using the id
    // because we now have selectUserById that returns the exact user for us
    //const theUser = useSelector(state => state.users.find(user => user.id === userId));
    return <span>by {userById ? userById.name : 'unknown author'}</span>
}
