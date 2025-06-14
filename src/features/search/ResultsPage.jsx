import React, { useState, useMemo, useEffect } from 'react';
import Spinner from '../../components/common/Spinner';
import ResultsTabs from './components/ResultsTabs';
import ProductGrid from './components/ProductGrid'; // <--- 1. Импортируем новый компонент

const MARKETPLACES = ['MMG', 'Onliner', 'Kufar', '21vek'];

const ResultsPage = ({ results, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState('');

  const visibleMarketplaces = useMemo(() => {
    if (!results?.products_data) return [];
    return MARKETPLACES.filter(mp => results.products_data[mp]?.length > 0);
  }, [results]);

  // Этот useEffect будет следить за изменением видимых маркетплейсов
  // и устанавливать активной первую вкладку из списка.
  useEffect(() => {
    if (visibleMarketplaces.length > 0 && !visibleMarketplaces.includes(activeTab)) {
      setActiveTab(visibleMarketplaces[0]);
    }
  }, [visibleMarketplaces, activeTab]);

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    if (!results || visibleMarketplaces.length === 0) {
      return <div className="no-results"><h3>Products not found</h3><p>Try a different query or adjust your filters.</p></div>;
    }

    // Получаем продукты для активной вкладки
    const productsToShow = results.products_data[activeTab] || [];

    return (
        <>
            <ResultsTabs
                productData={results.products_data}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                visibleMarketplaces={visibleMarketplaces}
            />
            {/* 2. Используем компонент ProductGrid вместо прямого .map */}
            <ProductGrid products={productsToShow} />
        </>
    );
  };

  return (
    <main className="results-main">
        <div className="container">
            {renderContent()}
        </div>
    </main>
  );
};

export default ResultsPage;
