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
 * Component for the list of Posts section
 * @param {object} props Properties
 * @returns Component for PostList
 */
function PostList(props) {
  // Page Details
  const currentPage = props.currentPage;
  const setCurrentPage = props.setCurrentPage;
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // We are only interested in posts of a specific category
  const posts = filterPostList(props.posts, props.category)

  // Records to be displayed on the current page
  const pagePosts = posts.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(posts.length / recordsPerPage);

  // Check if posts are present
  if (posts.length === 0) {
    // Return message is no posts
    return (
      <p className='center'>No Posts Found</p>
    );
  } else {
    // Else display content
    return (
      // Semantic Markup
      <section>
        <p>{posts.length} Results</p>
        <Navigation nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <hr/>
        <ul className="no-bullets">
          {pagePosts.map(post => <li key={post.id}><Post post={post}/><hr/></li>)}
        </ul>
        <Navigation nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <br/>
      </section>
    );
  }
}

/**
 * Page Navigation Component
 * @param {object} props Properties
 * @returns Navigation Component
 */
function Navigation(props) {
  // Important Variables
  let nPages = props.nPages;
  let currentPage = props.currentPage;
  let setCurrentPage = props.setCurrentPage;

  // Go to first page
  const firstPage = () => {
    setCurrentPage(1);
  }

  // Go to previous page
  const prevPage = () => {
    if(currentPage !== 1) 
      setCurrentPage(currentPage - 1);
  }

  // Go to next page
  const nextPage = () => {
    if(currentPage !== nPages) 
      setCurrentPage(currentPage + 1);
  }

  // Go to last page
  const lastPage = () => {
    setCurrentPage(nPages);
  }

  // Done
  return (
    <nav>
      <ul>
        <li>
          <button onClick={firstPage}>
            &lt;&lt;
          </button>
        </li>
        <li>
          <button onClick={prevPage}>
            &lt;
          </button>
        </li>
        <li>
          <button disabled>{currentPage}</button>
        </li>
        <li>
          <button onClick={nextPage}>
            &gt;
          </button>
        </li>
        <li>
          <button onClick={lastPage}>
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}

/**
 * Component for the filter form. Filters posts by a single category.
 * @param {object} props Properties
 * @returns Component form of Filter
 */
function Filter(props) {
  // Important Variables
  let category = props.category;
  let setCategory = props.setCategory;
  let setCurrentPage = props.setCurrentPage;

  // Ensure filter does not reset when press Enter
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  // Post list should update in real time
  return (
    <form onSubmit={handleSubmit}>
      <label>Category:&nbsp;
        <input 
          type="text"
          value={category}
          onChange={
            (event) => {
              setCurrentPage(1);
              setCategory(event.target.value);
            }
          }
        />
      </label>
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
  const [currentPage, setCurrentPage] = useState(1); 

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
    return <p className="center">Error: {error.message}</p>;
  } else if (!isLoaded) {
    // Not loaded yet, display message
    return <p className="center">Loading...</p>;
  } else {
    // Display Content
    return (
      <main align="center" className='pad'>
        <Filter category={category} setCategory={setCategory} setCurrentPage={setCurrentPage}/>
        <hr/>
        <PostList posts={posts} category={category} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </main>
    );
  }
}

export default App;
