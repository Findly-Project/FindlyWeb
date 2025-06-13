import { useLocalStorage } from '../../hooks/useLocalStorage';

const MAX_EXCLUDE_WORDS = 5;
const DEFAULT_SETTINGS = {
  maxSize: 20,
  filters: {
    onlyNew: false,
    nameFilter: false,
    priceFilter: false,
    excludeWords: [],
  },
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage('findlyAppSettings', DEFAULT_SETTINGS);

  const setMaxSize = (size) => {
    setSettings(prev => ({ ...prev, maxSize: size }));
  };

  const toggleFilter = (filterName) => {
    setSettings(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterName]: !prev.filters[filterName],
      },
    }));
  };

  const addExcludeWord = (word) => {
    if (settings.filters.excludeWords.length >= MAX_EXCLUDE_WORDS) {
      // Здесь мы будем возвращать ошибку, а компонент ее покажет
      throw new Error('Достигнут лимит слов-исключений.');
    }
    if (settings.filters.excludeWords.includes(word)) {
      throw new Error('Такое слово уже добавлено.');
    }
    setSettings(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        excludeWords: [...prev.filters.excludeWords, word],
      },
    }));
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

  return {
    settings,
    setMaxSize,
    toggleFilter,
    addExcludeWord,
    removeExcludeWord,
  };
}
