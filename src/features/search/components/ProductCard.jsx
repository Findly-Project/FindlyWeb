export function ProductCard({ product }) {
  const { link, image, name, price } = product;
  const defaultImageText = 'Изображение недоступно';

  return (
    <a href={link || '#'} target="_blank" rel="noopener noreferrer" className="product-card">
      <div className="product-image">
        {image ? (
          <img src={image} alt={name || 'Товар'} onError={(e) => { e.target.parentElement.innerHTML = defaultImageText; }} />
        ) : (
          defaultImageText
        )}
      </div>
      <div className="product-info">
        <div className="product-title">{name || 'Название товара'}</div>
        <div className="product-price">{price || 'Цена не указана'} BYN</div>
      </div>
    </a>
  );
}
