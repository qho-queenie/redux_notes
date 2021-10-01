import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// adding a new action creator from the slice
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

export const AddPostForm = () => {
    const listOfAuthors = useSelector(selectAllUsers);

    // these are not global states, so can stay as local hooks:
    // only AddPostForm needs to know these temp states
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [disabled, setDisabled] = useState(true);

    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const firstRender = useRef(true);

    useEffect(() => {
        const formValidation = () => {
            if (!title || !content || !userId) {
                return true;
            } else {
                return false;
            }
        }
        // no validation on first run
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        setDisabled(formValidation)

    }, [title, content, userId]);

    const authorsOptions = listOfAuthors.map(author => (
        <option key={author.id} value={author.id}>
            {author.name}
        </option>
    ))

    // imported, then use it
    const dispatch = useDispatch();

    // when this async thunk returns a promise from the dispatch, 
    // we can await that promise here so we know when the thunk has finished the request
    const onSavePostClicked = async () => {
        console.log(userId, 'userID from state hook')
        if (!disabled && addRequestStatus === 'idle') {

            try {
                setAddRequestStatus('pending');
                setDisabled(true);
                // somehow this unwrap is returned by the promise as well:
                // it gives us the action.payload if the promise has been fulfilled
                // or it gives an error if its a reject in the promise
                // this allows us to use it to display to POSTed results, or the error
                await dispatch(addNewPost({ title, content, user: userId })).unwrap()

                //dont we need something try catch? yes
                setTitle('');
                setContent('');
                setUserId('')
            } catch (err) {
                console.log(err)
            } finally {
                setDisabled(false);
                setAddRequestStatus('idle')
            }
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>

            <form>
                <label className='postTitle'>Post Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <label className='postAuthor'>Author:</label>

                <select id='postAuthor' value={userId} onChange={e => setUserId(e.target.value)}>
                    <option value=''></option>
                    {authorsOptions}
                </select>

                <lable className='postContent'>Content:</lable>
                <textarea
                    type='text'
                    id='postContent'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />

                <button type='button' onClick={onSavePostClicked} disabled={disabled}>Save Post</button>
            </form>
        </section>
    )
}
