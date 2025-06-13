import React from 'react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <ProductCard key={product.link || index} product={product} />
      ))}
    </div>
  );
}
