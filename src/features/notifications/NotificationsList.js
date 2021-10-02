// display the list of notifications from state,
// also display the notifications' user name

import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames';

import { selectAllUsers } from '../users/usersSlice'

import {
    allNotificationsRead,
    selectAllNotifications
} from './notificationsSlice'


export const NotificationsList = () => {
    //honestly this is kinda weird
    const dispatch = useDispatch()

    // using useLayoutEffect instead of useEffect because we dont want the DOM to flicker from updating the state of 'unread' to 'read'
    useLayoutEffect(() => {
        dispatch(allNotificationsRead())
    })

    // grab the notifications from the store first, its an array 
    // also grab all the users
    const notifications = useSelector(selectAllNotifications);
    const users = useSelector(selectAllUsers);

    const renderedNotifications = notifications.map(eachNotification => {
        const date = parseISO(eachNotification.date);
        const timeAgo = formatDistanceToNow(date);
        const user = users.find(eachUser => eachUser.id === eachNotification.user) || {
            name: 'Unknown User'
        }
        // conditionally setting className as 'notification new' if the notification.isNew is true
        const notificationClassname = classnames('notification', { new: notifications.isNew })

        return (
            <div key={eachNotification.id} className={notificationClassname}>
                <div>
                    <b>{user.name}</b> {eachNotification.message}
                </div>
                <div title={eachNotification.date}>
                    <i>{timeAgo} ago</i>
                </div>
            </div>
        )
    })

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    )

}
