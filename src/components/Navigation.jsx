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

export default Navigation;