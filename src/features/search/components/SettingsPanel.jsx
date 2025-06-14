import React, { useState } from 'react';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';

const SettingsPanel = () => {
  const {
    maxSize, setMaxSize,
    filters, setFilter,
    addExcludeWord, removeExcludeWord
  } = useSettings();

  const { showToast } = useToast();
  const [excludeInput, setExcludeInput] = useState('');

  const handleAddExcludeWord = () => {
    const word = excludeInput.trim();
    // Валидация из вашего app.js
    if (!word) {
        showToast('Exclude word cannot be empty', 1500);
        return;
    }
    if (word.length > 8) {
        showToast('Exclude word must be <= 8 characters', 1500);
        return;
    }
    if (!/^[a-zA-Zа-яА-Я0-9]*$/.test(word)) {
        showToast('Exclude word can contain only numbers and letters', 2000);
        return;
    }
    if (filters.excludeWords.includes(word)) {
        showToast('Excluded word has already been added', 1500);
        return;
    }
    addExcludeWord(word);
    setExcludeInput('');
  };

  return (
    <div className="settings-menu">
        <div className="settings-section">
            <h4>Search params</h4>
            <label>
                <input type="checkbox" className="filter-checkbox" checked={filters.onlyNew} onChange={(e) => setFilter('onlyNew', e.target.checked)} />
                Only new products
            </label>
            <label>
                <input type="checkbox" className="filter-checkbox" checked={filters.nameFilter} onChange={(e) => setFilter('nameFilter', e.target.checked)} />
                Filter by name
            </label>
            <label>
                <input type="checkbox" className="filter-checkbox" checked={filters.priceFilter} onChange={(e) => setFilter('priceFilter', e.target.checked)} />
                Filter by price
            </label>
        </div>
        <div className="settings-section">
            <div className="custom-select">
                <label>Size of products:</label>
                <select className="max-size-btn" value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))}>
                    {[10, 20, 30, 40].map(size => <option key={size} value={size}>{size}</option>)}
                </select>
            </div>
        </div>
        <div className="settings-section">
             <h4>Exclude words:</h4>
             <div className="exclude-words-ui">
                <input
                    id="exclude-word-input"
                    type="text"
                    value={excludeInput}
                    onChange={(e) => setExcludeInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddExcludeWord()}
                />
                <button id="add-exclude-word" onClick={handleAddExcludeWord}>Add</button>
             </div>
             <div className="exclude-words-list">
                {filters.excludeWords.map(word => (
                    <span key={word} className="exclude-word-chip">
                        {word}
                        <button onClick={() => removeExcludeWord(word)} title="Remove">×</button>
                    </span>
                ))}
             </div>
        </div>
    </div>
  );
};

export default SettingsPanel;
