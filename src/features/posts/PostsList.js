import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    fetchPosts,
    // new getSelectors from entity adaptor:
    selectPostIds,
    selectPostById
} from "./postsSlice";

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'

let PostExcerpt = ({ postId }) => {
    // a new getSelector that uses post id to get the 1 post we want
    const post = useSelector(state => selectPostById(state, postId))
    return (
        <article className='post-excerpt' key={postId}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className='post-content'>{post.content.substring(0, 100)}...</p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className='button muted-button'>
                View Post
            </Link>
        </article >
    )
}
// so PostExcerpt does not re-run even we just clicked on Posts List
// we created a new posts array reference (from an immutable update), and causes its children components to re-render as well
// use memo from React to conditionally re-render PostExerpt, 
PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
    const dispatch = useDispatch();
    // to render whatever is in state, we need it from the store using useSelector
    // useSelector functions are called with the entire state obj as a param
    // selectors re-run when store is updated
    // const posts = useSelector(state => state.posts)
    // const posts = useSelector(selectAllPosts);
    // this is sorted already:
    const orderedPostIds = useSelector(selectPostIds);
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    // useEffect because we want to fetch once the component mounts
    useEffect(() => {
        // we only fetch when status is idle, so it doesnt re-fetches when switching view 
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <Spinner text='Loooooooading...' />
    }
    else if (postStatus === 'succeeded') {
        // the sorted array has all the postIds only
        content = orderedPostIds.map(postId => (
            <PostExcerpt key={postId} postId={postId} />
        ))
        // no need to manually sort anymore, entity's array is sorted by date
        // use slice to make a copy 
        //const sortedPosts = posts.slice().sort((a, b) => b.date - a.date);
        // content = sortedPosts.map(post => (
        //     <PostExcerpt key={post.id} post={post} />
        // ))
    }
    else if (postStatus === 'failed') {
        // {error} is a selector from above
        content = <div>{error}</div>
    }

    return (
        <section className='posts-list'>
            <h2>Posts:</h2>
            {content}
        </section>

    )
}
