import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Get the data from the API.
 * @param {string} api Link to API
 * @returns Appropriate Promise if success, else empty array
 */
async function getData(api) {
  // Try to get data
  try{
    const response = await fetch(api);
    return await response.json();
  } 
  // Cannot get data
  catch(error) {
    return [];
  }
}

/**
 * Component for Category in Post
 * @param {object} props Properties
 * @returns Component form of Category
 */
function Category(props) {
  return <p>{props.category.name}</p>;
}

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
      <p>Date Published: {post.publishDate}</p>
      <h3>Author: {post.author.name}</h3>
      <img src={post.author.avatar} alt="avatar"/>
      <p>{post.summary}</p>
      <h4>Categories</h4>
      <ul class="no-bullets">
        {post.categories.map(category => <li key={category.id}><Category category={category}/></li>)}
      </ul>
    </article>
  );
}

/**
 * Main Component. Renders to DOM directly.
 * @returns null
 */
function App() {
  // Retrieve data from API
  getData("/api/posts").then(
    // Success
    function(data) { 
      // Get only the posts
      let posts = data.posts;
      ReactDOM.render(
        // Semantic Markup
        <section align="center">
          <ul class="no-bullets">
            {posts.map(post => <li key={post.id}><Post post={post}/><hr/></li>)}
          </ul>
        </section>
      , document.getElementById('root'));
    },

    // Failure
    function(error) {
      console.error(error);
    }
  );

  // We've already rendered everything
  return null;
}

export default App;
