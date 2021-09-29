// createSlice to make a reducer function that handles posts data
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns'

// the reducer needs some initial data when app starts up
const initialState = [
    {
        id: '1',
        title: 'First Post!',
        content: 'Hello!',
        user: '0',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            poop: 0,
            eyes: 0,
        },
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'More text',
        user: '2',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            poop: 0,
            eyes: 0,
        },
    },
]

// createSlice expects 1 argument, which will be put into the action obj as action.payload
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    // createSlice generates action creators for functions for each reducer below
    // add reducer functions here to handle dispatches, then export to wherever its needed
    reducers: {
        // reducers receive 2 args: current state and action obj
        // postAdded: (state, action) => {
        //     // putting the action obj's payload into existing (copy of) state array
        //     state.push(action.payload)
        // },

        postAdded: {
            // reducer's prepare callback:
            // instead of having the dispatch prepare for the reducer function, 
            // reducer's prepare can prep the correct format, and add wtever we want in the return payload obj 
            // whatever synchronous logic is needed to decide what values goes into the action obj
            // then return an obj with the payload field inside
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        },
                        userId
                    },
                }
            },
            reducer: (state, action) => {
                state.push(action.payload)
            },

        },
        // {type: 'posts/postUpdated', payload: {id, title, content}}
        // 1. find the post 2. replace its payload
        postUpdated: (state, action) => {
            // hello destructuring:
            const { id, title, content } = action.payload;
            const postToEdit = state.find(post => post.id === id);
            if (postToEdit) {
                // benefits from destructuring:
                postToEdit.title = title;
                postToEdit.content = content;
            }
        },

        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const postToEdit = state.find(post => post.id === postId);
            if (postToEdit) {
                postToEdit.reactions[reaction]++;
            }
        }
    }
})

// the dispatch function only needs the .actions part, the current state is only the reducer's business
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
