import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import { client } from '../../api/client';

const usersAdaptor = createEntityAdapter();

// no extra fields needed in the initial state, just the standard shape
const initialState = usersAdaptor.getInitialState();

// thunks:
export const fetchUsers = createAsyncThunk('/users/fetchUsers/', async () => {
    const response = await client.get('/fakeApi/users');
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, usersAdaptor.setAll)

        // its simply in action.payload? nothing more to open? or im just sleepy?

        // why dont we need to put the promise' data into the user's state?
        // state.users = state.users.concat(action.payload);

        // okay? we are just giving the payload to whoever calls it, w/o saving it anywhere?
        // ok the payload lives in the store 4ever?
        // return action.payload
    }
});

// export const selectAllUsers = state => state.users;

// export const selectUserById = (state, userId) =>
//     state.users.find(user => user.id === userId);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = usersAdaptor.getSelectors(state => state.users)

export default usersSlice.reducer
