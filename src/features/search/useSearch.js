import { useState, useCallback } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { fetchSearchResults } from '../../api/searchService';

export const useSearch = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTime, setSearchTime] = useState(0);

  const { maxSize, filters } = useSettings();

  const executeSearch = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    const startTime = performance.now();

    try {
      const data = await fetchSearchResults(query, maxSize, filters);
      setResults(data);
    } catch (err) {
      let errorMessage = 'Error while searching';
      if (err.message === 'Timeout') {
        errorMessage = 'Search request timed out.';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = `Unable to connect to the server.`;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      const endTime = performance.now();
      setSearchTime(endTime - startTime);
    }
  }, [maxSize, filters]); // Зависимости хука

  return { results, isLoading, error, searchTime, executeSearch };
};
