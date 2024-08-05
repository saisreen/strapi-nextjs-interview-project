import React, { useState } from "react";

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        style={{ padding: "0.5rem", width: "200px" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
