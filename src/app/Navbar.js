import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationsSlice'
// to find out how many new notifications there are 


export const Navbar = () => {
  const dispatch = useDispatch();

  const allNotifications = useSelector(selectAllNotifications);
  const numUnreadNotifications = allNotifications.filter(eachNotification => !eachNotification.read).length;
  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = <span className='badge'>{numUnreadNotifications}</span>
  }
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to={'/'} className='button muted-button'>
              All Posts
            </Link>

            <Link to={`/users`} className='button muted-button'>
              All Users
            </Link>

            <Link to={'/notifications'} className='button muted-button'>
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>

          <button className='button' onClick={() => dispatch(fetchNotifications())}>
            Refresh Notifications
          </button>


        </div>
      </section>
    </nav>
  )
}
