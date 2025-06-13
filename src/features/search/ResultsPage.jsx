import React, { useState, useEffect } from 'react';
import { ResultsTabs } from './components/ResultsTabs';
import { ProductGrid } from './components/ProductGrid';
import { Spinner } from '../../components/common/Spinner'; // Предполагаем, что создали этот компонент

export function ResultsPage({ results, isLoading, error, searchMeta }) {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (results) {
      const firstMarketplaceWithResults = Object.keys(results).find(
        (mp) => results[mp] && results[mp].length > 0
      );
      setActiveTab(firstMarketplaceWithResults || '');
    }
  }, [results]);

  if (isLoading) {
    return (
      <div className="loading-indicator">
        <Spinner />
        <p>Идет поиск...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const hasAnyResults = Object.values(results).some(products => products.length > 0);

  if (!hasAnyResults) {
    return <div className="no-results">По вашему запросу ничего не найдено.</div>;
  }

  return (
    <section id="results-page" className="results-main">
      <div className="search-meta-container">
        {searchMeta.duration && <div className="search-time">Поиск занял: {searchMeta.duration} мс</div>}
        <div className="search-tags">
          {searchMeta.tags.map(tag => <span key={tag} className="search-tag">{tag}</span>)}
        </div>
      </div>

      <ResultsTabs
        searchResults={results}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      <ProductGrid products={results[activeTab]} />
    </section>
  );
}
