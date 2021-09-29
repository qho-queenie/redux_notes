// a component to take A post as a prop via useSelect
// 1. display a list of emojis as buttons
// 2. as a button to give a particular emoji
// 3. show the number of emojis given to a post

import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    poop: '💩',
    eyes: '👀'
};

// we are expect 1 post coming in only
export const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();
    //we need to extract the name (key) of the emoji, and the imagery (value)
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emo]) => {
        return (
            <button
                key={name}
                type='button'
                className='muted-button reaction button'
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
                {/* using reactionEmoji obj to match each name to existing or non-existing keys in post.reactions */}
                {emo}{post.reactions[name]}
            </button>
        )
    })
    return <div>{reactionButtons}</div>
}
