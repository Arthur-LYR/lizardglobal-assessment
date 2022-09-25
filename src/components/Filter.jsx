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
    );
}

export default Filter;