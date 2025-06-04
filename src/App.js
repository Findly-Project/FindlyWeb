import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (q) => {
    if (!q.trim()) {
      setError("Введите поисковый запрос");
      setResults(null);
      setSearched(false);
      return;
    }
    setError("");
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/search?q=${encodeURIComponent(q)}&ms=40`
      );
      if (!res.ok) throw new Error("Ошибка сервера");
      const data = await res.json();
      setResults(data.products_data || {});
      if (
        !data.products_data ||
        Object.values(data.products_data).every((arr) => arr.length === 0)
      ) {
        setError("Товары не найдены");
      }
    } catch (e) {
      setError("Ошибка соединения с API");
      setResults(null);
    }
    setLoading(false);
  };

  return (
    <div className="app-root">
      <motion.div
        className="search-section"
        animate={
          searched
            ? { y: "-120px", scale: 0.85 }
            : { y: "0px", scale: 1 }
        }
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
      >
        <motion.h1
          className="main-title"
          animate={searched ? { fontSize: "2.5rem" } : { fontSize: "4rem" }}
          transition={{ duration: 0.5 }}
        >
          FindlyWeb
        </motion.h1>
        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          disabled={loading}
          initialQuery={query}
          setQuery={setQuery}
        />
      </motion.div>

      <AnimatePresence>
        {searched && (
          <motion.div
            className="results-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {loading ? (
              <div className="info-message">Поиск товаров...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              results && <Results productsData={results} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
