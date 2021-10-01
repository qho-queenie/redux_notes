import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { fetchUsers } from './features/users/usersSlice';
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

import { worker } from './api/server'

// Start our mock API server
worker.start({ onUnhandledRequest: 'bypass' })

// why do we only need to fetch users once, when the app starts?
// what if another user has just been newly added?
store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
