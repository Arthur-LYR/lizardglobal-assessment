import React, { useState, useEffect } from 'react';

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

/**
 * Component for the list of Posts section
 * @param {object} props Properties
 * @returns Component for PostList
 */
function PostList(props) {
  // We are only interested in posts of a specific category
  let posts = props.posts;

  return (
    // Semantic Markup
    <section>
      <ul className="no-bullets">
        {posts.map(post => <li key={post.id}><Post post={post}/><hr/></li>)}
      </ul>
    </section>
  );
}

/**
 * Given an array of posts, filter by category
 * @param {Array[object]} posts Array of Posts
 * @param {string} filterCat Category to filter by
 * @returns Filtered list of posts
 */
 function filterPostList(posts, filterCat) {
  // If no filter, return as is
  if (filterCat === "") {
    return posts;
  }

  // Filter and return
  return posts.filter(
    post => {
      // Check if categories list contains required post
      for (let i = 0; i < post.categories.length; i++) {
        let category = post.categories[i];
        // Case insensitive pattern matching
        if (category.name.toUpperCase().includes(filterCat.toUpperCase())) {
          return true;
        }
      }
      return false;
    }
  );
}

/**
 * Component for the filter form. Filters posts by a single category.
 * @param {object} props Properties
 * @returns Component form of Filter
 */
function Filter(props) {
  let posts = props.posts;
  let category = props.category;
  let setPosts = props.setPosts;
  let setCategory = props.setCategory;

  // Post list should update in real time
  return (
    <form>
      <label>Category:&nbsp;
        <input 
          type="text"
          value={category}
          onChange={
            e => {
              setCategory(e.target.value);
              setPosts(filterPostList(posts, category));
            }
          }
        />
      </label>
      <p>{posts.length} Results</p>
    </form>
  )
}

/**
 * Main Component.
 * @returns App Component
 */
function App() {
  // Important Values
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch from API
  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(
        (data) => {
          // Data has loaded successfully
          setIsLoaded(true);
          setPosts(data.posts);
        },
        (error) => {
          // Data did not load successfully
          setIsLoaded(true);
          setError(error);
          console.error(error);
        }
      )
  }, [])

  // Done
  if (error) {
    // Display Error
    return <p align="center">Error: {error.message}</p>;
  } else if (!isLoaded) {
    // Not loaded yet, display message
    return <p align="center">Loading...</p>;
  } else {
    // Display Content
    return (
      <main align="center">
        <Filter posts={posts} setPosts={setPosts} category={category} setCategory={setCategory}/>
        <hr/>
        <PostList posts={posts} category={category}/>
      </main>
    );
  }
}

export default App;
