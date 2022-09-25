import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PostList from './PostList';

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
