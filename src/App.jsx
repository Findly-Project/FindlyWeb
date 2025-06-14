import React, { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { useSearch } from './features/search/useSearch';

import HomePage from './features/search/HomePage'; // Вам нужно будет создать эти компоненты
import ResultsPage from './features/search/ResultsPage'; // на основе этого примера
import Header from './components/layout/Header'; // и вашего index.html

// Компонент AppWrapper, чтобы использовать хук useSearch внутри провайдера
function AppWrapper() {
    const [currentQuery, setCurrentQuery] = useState('');
    const { results, isLoading, error, searchTime, executeSearch } = useSearch();

    const handleSearch = (query) => {
        setCurrentQuery(query);
        executeSearch(query);
    };

    // В зависимости от того, есть ли запрос, показываем нужную страницу
    return (
        <>
            {currentQuery ? (
                <>
                    <Header onSearch={handleSearch} initialQuery={currentQuery} />
                    <ResultsPage
                        results={results}
                        isLoading={isLoading}
                        error={error}
                        searchTime={searchTime}
                    />
                </>
            ) : (
                <HomePage onSearch={handleSearch} />
            )}
        </>
    );
}

// Основной компонент App
function App() {
  return (
    // Оборачиваем всё приложение в провайдер настроек
    <SettingsProvider>
      <AppWrapper />
    </SettingsProvider>
  );
}

export default App;
