// find the correct post we are editing: id from match.params
// useSelector has all the post, find it with match.params
// retrieve the post's existing content with useSelector's content and title

// use local react hooks for the form fields, put a submit handler on the submit button
// dispatch the new content and title to the reducer postUpdated, then it will update the store

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postUpdated, selectPostById } from './postsSlice';

export const EditPostForm = ({ match }) => {
    // react-router will pass a match obj as a prop, which contains the URL info 
    // how does this work?
    const { postId } = match.params

    // useSelector gets the complete state, in all the posts find the post that has the id equals to match.params

    // (common) selectors extracted from componenets to their reducer
    // so we dont have to rewrite the same select const all the time

    // const post = useSelector(state =>
    //     state.posts.find(post => post.id === postId)
    // )
    const post = useSelector(state => selectPostById(state, postId));

    // imported then use it
    const dispatch = useDispatch();
    const history = useHistory();

    const onPostClick = () => {
        if (title && content) {
            dispatch(
                postUpdated({
                    id: postId,
                    title,
                    content
                })
            )
            history.push(`/posts/${postId}`)
        }
    }

    // local state hooks:
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    if (!post) {
        return (
            <section>
                <h2>Edit Post</h2>
                <h2>The post is not found!</h2>
            </section>
        )
    } else {
        return (
            <section>
                <h2>Edit Post</h2>
                <form>
                    <label className='postTitle'>Post Title:</label>

                    <input
                        type='text'
                        id='postTitle'
                        name='postTitle'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <label className='postContent'>Content:</label>
                    <textarea
                        id='postContent'
                        name='postContent'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </form>

                <button type='button' onClick={onPostClick}>
                    Save Post
                </button>
            </section>
        )
    }
}
