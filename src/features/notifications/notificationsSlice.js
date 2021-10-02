// createSlice to make a reducer function that handles notification data
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

// thunks:
// receive 2 args:
// 1. a string that will become the actiontype' prefix
// 2. the payload creation callback with an async returning a promise
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    // another arg thunks accept is an extra thunkAPI obj, in this use we are using the obj's dispatch and getstate right from the redux store
    // to dispatch more actions, get the latest state
    // destructure the getState out of the thunk API object to read the state value
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotification] = allNotifications
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        return response.data
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        // to set all current notications to be 'read' true
        allNotificationsRead(state, action) {
            state.forEach(notification => {
                notification.read = true;
            })
        }
    },
    // the fetchNotifications is outside of this notificationsSlice slice, so we need extraReducer
    // i thought extraReducer comes with builder arg? Or we dont need anything in builder obj?
    // in the last ex in postSlice we didnt use anything from the builder obj as well, just called it
    //we know the notifications will come back in an array 
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            // push the return array of action.payload into the current state array first
            state.push(...action.payload);
            state.forEach(notification => {
                // all read notifications are no longer new
                notification.isNew = !notification.read
            })
            // sort every date in the state 
            state.sort((a, b) => b.date.localeCompare(a.date))
        })
    }
})

export const { allNotificationsRead } = notificationsSlice.actions

export const selectAllNotifications = state => state.notifications

export default notificationsSlice.reducer