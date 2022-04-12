import React from "react";
import "../App.css";

function SearchBar({ searchTerm, setFilter, placeholder }) {
	return (
		<div className="search-bar">
			<input className="searchBar" type="text" placeholder={placeholder} value={searchTerm} onChange={setFilter} />
		</div>
	);
}

export default SearchBar;
