import React, { useState, useRef, useEffect } from 'react';
import { FaCog } from 'react-icons/fa'; // Используем иконку шестеренки
import SettingsPanel from './SettingsPanel';

/**
 * Компонент, который объединяет кнопку настроек и выпадающую панель.
 * Управляет состоянием видимости панели.
 */
const SettingsControl = () => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Этот хук добавляет обработчик клика по документу, чтобы закрывать
  // панель настроек, если пользователь кликает вне её.
  // Логика взята из вашего оригинального app.js [1].
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setPanelOpen(false);
      }
    }
    // Начинаем слушать клики, когда компонент монтируется
    document.addEventListener("mousedown", handleClickOutside);
    // Прекращаем слушать, когда компонент размонтируется
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="settings-control-wrapper" ref={wrapperRef}>
      <button
        onClick={() => setPanelOpen(!isPanelOpen)}
        className="settings-control-button"
        title="Search settings"
        aria-label="Open search settings"
      >
        <FaCog size={22} />
      </button>

      {/* Условный рендеринг панели настроек [8][9] */}
      {isPanelOpen && <SettingsPanel />}
    </div>
  );
};

export default SettingsControl;
