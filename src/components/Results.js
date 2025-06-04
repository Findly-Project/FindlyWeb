import React, { useState } from "react";

const MARKETPLACES = [
  { key: "mmg", label: "ММГ" },
  { key: "onliner", label: "Onliner" },
  { key: "kufar", label: "Kufar" },
  { key: "21vek", label: "21vek" },
];

function Results({ productsData }) {
  const availableTabs = MARKETPLACES.filter(
    (mp) => productsData[mp.key] && productsData[mp.key].length > 0
  );
  const [activeTab, setActiveTab] = useState(
    availableTabs[0]?.key || MARKETPLACES[0].key
  );

  return (
    <div className="results-root">
      <div className="tabs">
        {MARKETPLACES.map((mp) => (
          <button
            key={mp.key}
            className={
              "tab-btn" +
              (activeTab === mp.key ? " active" : "") +
              (!productsData[mp.key] || productsData[mp.key].length === 0
                ? " disabled"
                : "")
            }
            onClick={() => productsData[mp.key]?.length && setActiveTab(mp.key)}
            disabled={!productsData[mp.key] || productsData[mp.key].length === 0}
          >
            {mp.label}{" "}
            {productsData[mp.key] && productsData[mp.key].length > 0
              ? `(${productsData[mp.key].length})`
              : ""}
          </button>
        ))}
      </div>
      <div className="results-grid">
        {productsData[activeTab]?.map((item, idx) => (
          <div className="product-card" key={item.url + idx}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img
                src={item.image_url || "/no-image.png"}
                alt={item.title}
                className="product-img"
              />
              <div className="product-title">{item.title}</div>
              <div className="product-price">{item.price}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
