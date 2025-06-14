import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Начальное состояние для настроек, взято из вашего app.js
const initialSettings = {
  maxSize: 20,
  filters: {
    onlyNew: false,
    nameFilter: false,
    priceFilter: false,
    excludeWords: [],
  },
};

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage('findlyAppSettings', initialSettings);

  const MAX_EXCLUDE_WORDS = 5;

  const setMaxSize = (size) => {
    setSettings(prev => ({ ...prev, maxSize: size }));
  };

  const setFilter = (filterName, value) => {
    setSettings(prev => ({
      ...prev,
      filters: { ...prev.filters, [filterName]: value },
    }));
  };

  const addExcludeWord = (word) => {
    if (settings.filters.excludeWords.length >= MAX_EXCLUDE_WORDS) {
        // Здесь можно добавить логику уведомления пользователя
        console.warn("Exclude word limit reached");
        return;
    }
    if (!settings.filters.excludeWords.includes(word)) {
      setSettings(prev => ({
        ...prev,
        filters: { ...prev.filters, excludeWords: [...prev.filters.excludeWords, word] },
      }));
    }
  };

  const removeExcludeWord = (wordToRemove) => {
    setSettings(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        excludeWords: prev.filters.excludeWords.filter(word => word !== wordToRemove),
      },
    }));
  };

  // Значения, которые будут доступны всем дочерним компонентам
  const value = {
    maxSize: settings.maxSize,
    filters: settings.filters,
    setMaxSize,
    setFilter,
    addExcludeWord,
    removeExcludeWord,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
