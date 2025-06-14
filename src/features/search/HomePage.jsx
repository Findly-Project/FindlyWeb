import React, { useState } from 'react';
import Button from '../../components/common/Button';
import ThemeToggleButton from '../../components/common/ThemeToggleButton'
import SettingsControl from './components/SettingsControl'
import { useToast } from '../../context/ToastContext';


const AnimatedTitle = ({ text }) => {
    return (
        <h1 className="logo">
            {text.split('').map((char, index) => (
                <span key={index} className="letter" style={{ animationDelay: `${index * 0.12}s` }}>
                    {char}
                </span>
            ))}
        </h1>
    );
};

const HomePage = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Валидация из вашего app.js
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        showToast('Query cannot be empty');
        return;
    }
    if (!/^[a-zA-Zа-яА-Я0-9- ]*$/.test(trimmedQuery)) {
        showToast('The request can contain only numbers and letters');
        return;
    }
    if (trimmedQuery.length < 3 || trimmedQuery.length > 20) {
        showToast('The request must be between 3 and 20 characters');
        return;
    }
    onSearch(trimmedQuery);
  };

  return (
    <main className="home-page">
      <ThemeToggleButton />
      <SettingsControl />
      <div className="home-container">
        <AnimatedTitle text="FindlyWeb" />
        <div className="search-container">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
            <Button type="submit" className="btn--primary search-button" id="main-search-button">
              Search
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
