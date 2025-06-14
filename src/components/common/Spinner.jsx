import React from 'react';

// CSS для этого компонента находится в main.css
const Spinner = () => {
  return (
    <div className="loading-indicator">
      <div className="loading-spinner"></div>
      <p>Searching for products...</p>
    </div>
  );
};

export default Spinner;
