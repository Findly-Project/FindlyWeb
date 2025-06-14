import React from 'react';

const ResultsTabs = ({ productData, activeTab, onTabChange, visibleMarketplaces }) => {
    return (
        <div className="marketplace-tabs">
            <div className="tabs-container">
                {visibleMarketplaces.map(mp => {
                    const count = productData[mp]?.length || 0;
                    return (
                        <button
                            key={mp}
                            className={`tab-button ${activeTab === mp ? 'active' : ''}`}
                            onClick={() => onTabChange(mp)}
                        >
                            {mp}
                            <span className="tab-count">{count}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default ResultsTabs;
