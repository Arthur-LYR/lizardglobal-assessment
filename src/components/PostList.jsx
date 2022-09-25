import Post from "./Post";
import Navigation from "./Navigation";

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

export default PostList;