import { React } from "react";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostsList = () => {
    // to render whatever is in state, we need it from the store using useSelector
    // useSelector functions are called with the entire state obj as a param
    // selectors re-run whev store is updated
    const posts = useSelector(state => state.posts)

    // use slice to make a copy 
    const sortedPosts = posts.slice().sort((a, b) => b.date - a.date);

    // useSelector then return specific data 
    const renderedPosts = sortedPosts.map(post => (
        <article className='post-exerpt' key={post.id}>
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
    ))

    return (
        <section className='posts-list'>
            <h2>Posts:</h2>
            {renderedPosts}
        </section>

    )
}
