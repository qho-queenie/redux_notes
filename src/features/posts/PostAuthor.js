// this component is for that takes an ID and returns the name of the user
import React from 'react';
import { useSelector } from 'react-redux';

export const PostAuthor = ({ userId }) => {
    // even we only called fetchUsers once in the index.js, the results live in the store(state)
    // so we can access the users from a selector
    // then why cant we do the same with posts? Without hving to set posts from fetchPosts?
    const theUser = useSelector(state => state.users.find(user => user.id === userId));

    return <span>by {theUser ? theUser.name : 'unknown author'}</span>
}
