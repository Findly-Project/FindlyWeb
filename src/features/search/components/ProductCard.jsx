import React from 'react';

// Компонент принимает один проп - объект product
const ProductCard = ({ product }) => {
  // Проверка на наличие основных данных
  if (!product) {
    return null;
  }

  return (
    <a
      href={product.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card"
    >
      <div className="product-image">
        {product.img_link ? (
          <img src={product.img_link} alt={product.name || 'Product'} loading="lazy" />
        ) : (
          <span>No image</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title" title={product.name}>
          {product.name || 'No title'}
        </h3>
        <p className="product-price">
          {product.price ? `${product.price} BYN` : 'Price not specified'}
        </p>
      </div>
    </a>
  );
};

export default ProductCard;
