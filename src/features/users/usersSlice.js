import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = [];

// [
// { id: 0, name: 'Tianna Jenkins' },
//     { id: 1, name: 'Kevin Grant' },
//     { id: 2, name: 'Madison Price' }
// ]

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
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // its simply in action.payload? nothing more to open? or im just sleepy?

            // why dont we need to put the promise' data into the user's state?
            // state.users = state.users.concat(action.payload);

            // okay? we are just giving the payload to whoever calls it, w/o saving it anywhere?
            // ok the payload lives in the store 4ever?
            return action.payload
        })
    }
});

export default usersSlice.reducer