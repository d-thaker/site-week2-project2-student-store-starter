import "./Search.css";

export default function Search({
  searchInputValue,
  handleOnSearchInputChange,
}) {
  return (
    <nav className="Search">
      <div className="content">
        <div className="row">
          <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchInputValue}
              onChange={handleOnSearchInputChange}
            />
            <i className="material-icons">search</i>
          </div>
        </div>
      </div>
    </nav>
  );
}
