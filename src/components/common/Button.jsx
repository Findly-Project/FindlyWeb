import React from 'react';

// Универсальная кнопка со стилями из вашего style.css
const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  const baseClass = 'btn';

  return (
    <button
      type={type}
      className={`${baseClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
