import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="details-btn">
            View Details
          </Link>
          <button type="button" onClick={() => addItem(product)} className="add-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}