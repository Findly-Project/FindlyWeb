import { useState } from 'react';
import { fetchSearchResults, getSearchTimeout } from '../../api/searchService';

export function useSearch() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchMeta, setSearchMeta] = useState({ duration: 0, tags: [] });

  const performSearch = async (query, settings) => {
    const startTime = performance.now();
    setIsLoading(true);
    setError(null);
    setResults(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), getSearchTimeout());

    const payload = {
      query: query,
      max_size: settings.maxSize,
      filters: settings.filters,
    };

    try {
      const data = await fetchSearchResults(payload, controller.signal);
      setResults(data.products_data);
      const duration = performance.now() - startTime;
      const tags = [];
      if (settings.filters.onlyNew) tags.push('Только новые');
      if (settings.filters.priceFilter) tags.push('Фильтр по цене');
      if (settings.filters.nameFilter) tags.push('Фильтр по названию');
      setSearchMeta({ duration: duration.toFixed(0), tags });

    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Поиск занял слишком много времени.');
      } else {
        setError('Произошла ошибка во время поиска.');
      }
      console.error(err);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return { results, isLoading, error, searchMeta, performSearch };
}
