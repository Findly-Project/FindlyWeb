import React, { useState } from 'react';
import SettingsPanel from '../../features/search/components/SettingsPanel';
import Button from '../common/Button'

// Иконка настроек в формате SVG для использования внутри компонента
const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.12l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>
    </svg>
);


const Header = ({ onSearch, initialQuery = '', searchTime, searchTags }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  // Функция для сброса на главную страницу (просто перезагрузка)
  const goToHome = () => window.location.reload();

  return (
    <header className="results-header">
      <div className="container">
        <div className="results-header-row">
          <h2 className="results-logo" onClick={goToHome} title="Go to Home">Findly</h2>

          <form className="results-search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search again..."
            />
            <Button type="submit" className="btn--primary btn--sm">Search</Button>
          </form>

          {searchTime > 0 && (
            <div className="search-time">
              {`Done in ${(searchTime / 1000).toFixed(2)}s`}
            </div>
          )}
        </div>

        {searchTags && searchTags.length > 0 && (
            <div className="search-tags">
                {searchTags.map(tag => <span key={tag} className="search-tag">{tag}</span>)}
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
