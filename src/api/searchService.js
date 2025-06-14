// Константы, перенесенные из вашего оригинального app.js
const API_BASE_URL = 'http://192.168.196.105:8000';
const SEARCH_ENDPOINT = '/api/search';
const SEARCH_TIMEOUT = 20000; // 20 секунд

/**
 * Отправляет поисковый запрос на сервер.
 * @param {string} query - Поисковый запрос.
 * @param {number} maxSize - Максимальное количество результатов.
 * @param {object} filters - Объект с фильтрами.
 * @returns {Promise<object>} - Данные с результатами поиска.
 * @throws {Error} - В случае ошибки сети или ответа сервера.
 */
export const fetchSearchResults = async (query, maxSize, filters) => {
  const url = new URL(API_BASE_URL + SEARCH_ENDPOINT);

  // Формируем тело запроса в соответствии с требованиями вашего API
  const payload = {
    query: query,
    max_size: maxSize,
    filters: {
      only_new: filters.onlyNew,
      name_filter: filters.nameFilter,
      price_filter: filters.priceFilter,
      exclude_words: filters.excludeWords
    }
  };

  // Используем AbortController для реализации таймаута запроса
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SEARCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) {
      // Если сервер вернул ошибку, создаем исключение
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Search request timed out.');
      throw new Error('Timeout');
    }
    console.error('Failed to fetch search results:', error);
    // Пробрасываем ошибку дальше для обработки в UI
    throw error;
  } finally {
    // Очищаем таймаут в любом случае
    clearTimeout(timeoutId);
  }
};
