import "../assets/bookPreload.css";


const Loader = () => {
    return (
        <div className= "bookContainer">
        <book className="book">
            <div className="book__pg-shadow"></div>
            <div className="book__pg"></div>
            <div className="book__pg book__pg--2"></div>
            <div className="book__pg book__pg--3"></div>
            <div className="book__pg book__pg--4"></div>
            <div className="book__pg book__pg--5"></div>
        </book>
        </div>
    )
};

export default Loader;