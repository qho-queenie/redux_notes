// createSlice to make a reducer function that handles posts data
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

// the reducer needs some initial data when app starts up
const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

// thunks, need 2 args:
// 1. string to be the prefix for the generated action type
// 2. a payload creator callback func that returns a PROMISE containing the data, or reject (pending/fufilled/rejected action types automatically)
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data;
})

export const addNewPost = createAsyncThunk('/posts/addNewPost',
    // initalPost is the payload creator {title, content, user} obj
    async initialPost => {
        const response = await client.post('/fakeApi/posts', initialPost);
        return response.data
    }
)
// [id: '2',
//     title: 'Second Post',
//         content: 'More text',
//             user: '2',
//                 date: sub(new Date(), { minutes: 5 }).toISOString(),
//                     reactions: {
//     thumbsUp: 0,
//         hooray: 0,
//             heart: 0,
//                 poop: 0,
//                     eyes: 0,
//         },
//     },]

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

        // postAdded: {
        //     // reducer's prepare callback:
        //     // instead of having the dispatch prepare for the reducer function, 
        //     // reducer's prepare can prep the correct format, and add wtever we want in the return payload obj 
        //     // whatever synchronous logic is needed to decide what values goes into the action obj
        //     // then return an obj with the payload field inside
        //     prepare: (title, content, userId) => {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 date: new Date().toISOString(),
        //                 title,
        //                 content,
        //                 reactions: {
        //                     thumbsUp: 0,
        //                     hooray: 0,
        //                     heart: 0,
        //                     rocket: 0,
        //                     eyes: 0,
        //                 },
        //                 userId
        //             },
        //         }
        //     },
        //     reducer: (state, action) => {
        //         state.posts.push(action.payload)
        //     },

        // },
        // {type: 'posts/postUpdated', payload: {id, title, content}}
        // 1. find the post 2. replace its payload
        postUpdated: (state, action) => {
            // hello destructuring:
            const { id, title, content } = action.payload;
            const postToEdit = state.posts.find(post => post.id === id);
            if (postToEdit) {
                // benefits from destructuring:
                postToEdit.title = title;
                postToEdit.content = content;
            }
        },

        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const postToEdit = state.posts.find(post => post.id === postId);
            if (postToEdit) {
                postToEdit.reactions[reaction]++;
            }
        }
    },
    // to handle the 3 dispatched action types by the thunk, based on the returned promsise
    // extraReducers are to respond to other actions outside of its own slice:
    // extraReducers is a () that takes 1 arg the 'bulilder' obj, 
    // which let us define wtever additional case reduers will run to respond to the outside slice action
    // builder.addCase(actionCreator, reducer) -> 
    // handles a single known action type based on an RTK action creator or an action type string
    extraReducers(builder) {
        builder
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // after posting to the server successfully, add the obj to the posts array
                state.posts.push(action.payload)
            })
        // we are listening for the action types dispatched by the fetchPosts thunk:
        builder
            // all these cases are attached in the fetchPost thunk, 'pending', 'fulfilled', 'rejected'

            // action creators can be used to automatically fill in the keys of the extraReducers obj
            // so the slice knows what actions to listen for
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // we arent saving the results to a db, just the posts store
                state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

// the dispatch function only needs the .actions part, the current state is only the reducer's business
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// common selectors: 
export const selectPostById = (state, postId) => {
    state.posts.posts.find(post => post.id === postId);
}

export const selectAllPosts = state => state.posts.posts;
