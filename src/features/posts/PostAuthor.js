// this component is for that takes an ID and returns the name of the user
import React from 'react';
import { useSelector } from 'react-redux';

export const PostAuthor = ({ userId }) => {
    const theUser = useSelector(state => state.users.find(user => user.id === userId));

    return <span>by {theUser ? theUser.name : 'unknown author'}</span>
}
