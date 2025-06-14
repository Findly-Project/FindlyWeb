import React from 'react';

// CSS для этого компонента находится в main.css
// Он получает состояние от ToastProvider
const Toast = ({ message, isVisible }) => {
  return (
    <div className={`toast-notification ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
