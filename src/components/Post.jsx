import Category from "./Category";

/**
 * Component for a Post
 * @param {object} props Properties
 * @returns Component form of Post
 */
function Post(props) {
    // We are only interested in post
    let post = props.post;

    return (
        // Use semantic markup
        <article>
        <h2>{post.title}</h2>
        <p>Date Published: {new Date(post.publishDate).toUTCString()}</p>
        <h3>Author: {post.author.name}</h3>
        <img src={post.author.avatar} alt="avatar"/>
        <p>{post.summary}</p>
        <h4>Categories</h4>
        <ul className="no-bullets">
            {post.categories.map(category => <li key={category.id}><Category category={category}/></li>)}
        </ul>
        </article>
    );
}

export default Post;