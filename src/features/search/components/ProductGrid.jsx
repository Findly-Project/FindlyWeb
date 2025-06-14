import React from 'react';
import ProductCard from './ProductCard';

/**
 * Компонент для отображения сетки карточек продуктов.
 * @param {object} props
 * @param {Array<object>} props.products - Массив объектов продуктов для отображения.
 */
const ProductGrid = ({ products }) => {
  // Если массив продуктов пуст или не передан, ничего не рендерим.
  if (!products || products.length === 0) {
    return null;
  }

  return (
    // Используем класс .products-grid из вашего файла main.css [2]
    <div className="products-grid">
      {products.map((product, index) => (
        // Генерируем уникальный ключ. Используем ссылку на товар, если она есть.
        <ProductCard key={product.link || `product-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
