/**
 * Component for Category in Post
 * @param {object} props Properties
 * @returns Component form of Category
 */
function Category(props) {
    return <p>{props.category.name}</p>;
}

export default Category;