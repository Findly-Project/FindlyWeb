import React from 'react';

const MARKETPLACES = ['MMG', 'Onliner', 'Kufar', '21vek'];

export function ResultsTabs({ searchResults, activeTab, onTabClick }) {
  if (!searchResults) {
    return null;
  }

  return (
    <div className="marketplace-tabs">
      <div className="tabs-container">
        {MARKETPLACES.map((marketplace) => {
          const products = searchResults[marketplace] || [];
          const count = products.length;

          if (count === 0) {
            return null;
          }

          const isActive = activeTab === marketplace;

          return (
            <button
              key={marketplace}
              className={`tab-button ${isActive ? 'active' : ''}`}
              onClick={() => onTabClick(marketplace)}
            >
              {marketplace}
              <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
