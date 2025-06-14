import { useState, useEffect } from 'react';

/**
 * Кастомный хук для синхронизации состояния с localStorage.
 * @param {string} key - Ключ в localStorage.
 * @param {*} initialValue - Начальное значение, если в localStorage ничего нет.
 * @returns {[*, function]} - Возвращает состояние и функцию для его обновления.
 */
function useLocalStorage(key, initialValue) {
  // Получаем начальное значение из localStorage или используем initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // useEffect для обновления localStorage при изменении состояния
  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === 'function'
          ? storedValue(storedValue)
          : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
