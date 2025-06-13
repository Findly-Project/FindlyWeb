const API_BASE_URL = 'http://192.168.196.105:8000';
const SEARCH_ENDPOINT = '/api/search';
const SEARCH_TIMEOUT = 20000;

export const fetchSearchResults = async (payload, signal) => {
  const url = `${API_BASE_URL}${SEARCH_ENDPOINT}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getSearchTimeout = () => SEARCH_TIMEOUT;
