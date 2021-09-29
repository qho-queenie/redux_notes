import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

// react-router will pass a match obj as a prop, which contains the URL info 
export const SinglePostPage = ({ match }) => {
    const { postId } = match.params

    // is there any way to liftup selectors? This seems like a common repetitor, why cant 'post' exist everywhere?
    // useSelector re-renders component whenever its 'state' or reference changes, so keep it small to avoid unnecc re-rendering
    const post = useSelector(state =>
        // in case user types in an invalid id, or post has been delete, etc
        state.posts.find(post => post.id === postId)
    )

    if (!post) {
        return (
            <section>
                <h2>The post is not found!</h2>
            </section>
        )
    } else {
        return (
            <section>
                <article className='post'>
                    <h2>{post.title}</h2>
                    <div>
                        <ReactionButtons post={post} />
                        <PostAuthor userId={post.user} />
                        <TimeAgo timestamp={post.date} />
                    </div>
                    <p className='post-content'>{post.content}</p>
                    <Link to={`/editPost/${post.id}`} className="button">
                        Edit Post
                    </Link>
                </article>
            </section >
        )
    }
}
