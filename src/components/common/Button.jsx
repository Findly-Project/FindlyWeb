import React from 'react';
import styles from './Button.module.css'; // Импортируем CSS модуль

export function Button({ children, onClick, disabled = false, type = 'button', className = '' }) {
  // Объединяем классы из модуля с любыми дополнительными классами, переданными через props
  const buttonClasses = `${styles.button} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
