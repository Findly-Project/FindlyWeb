import React, { useState } from "react";

function SearchBar({ onSearch, loading, disabled, initialQuery = "", setQuery }) {
  const [input, setInput] = useState(initialQuery);

  const handleChange = (e) => {
    setInput(e.target.value);
    setQuery && setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        placeholder="Поиск товаров..."
        value={input}
        onChange={handleChange}
        disabled={disabled}
        className="search-input"
      />
      <button type="submit" className="search-btn" disabled={disabled || loading}>
        {loading ? "Поиск..." : "Найти"}
      </button>
    </form>
  );
}

export default SearchBar;
