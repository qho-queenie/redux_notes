// take an user ID, and display of of this user's posts' titles as links:
// verify the ID being passed it is valid thru selectedUserById
// use this validated userId and find all the posts that have this userID thru selectAllPosts

import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectPostsByUser } from '../posts/postsSlice'

export const UserPage = ({ match }) => {
    const { userId } = match.params

    // verify this userId does exist 
    // const user = useSelector(state => selectUserById(state, userId));

    // const UserName = useSelector(state => {
    //     const allUsers = selectAllUsers(state)
    //     return allUsers.find(user => user.id === userId);
    // })
    // grab all the posts by this user by filtering thru all the post.user
    // this syntax can be confusing
    // const postsForUser = useSelector(state => {
    //     const allPosts = selectAllPosts(state)
    //     // useSelector re-run every time an action is dispatched, and if there is a new ref value the component re-renders
    //     // filter is pointing to a new array reference, causing re-renders
    //     // we need memoizing: save a previous input and calculate the results, but only re-calculate if the prev results have changed:
    //     // only 'filter' the array if state.posts or userId have changed, if not, just return the same filtered array ref as last time
    //     return allPosts.filter(post => post.user === userId)
    // })

    const postsForUser = useSelector(state => selectPostsByUser(state, userId))

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
                {post.title}
            </Link>
        </li>
    ))


    return (
        <section>
            {/* <h3>All posts by {UserName.name}</h3> */}
            <ul>{postTitles}</ul>
        </section>
    )
}
