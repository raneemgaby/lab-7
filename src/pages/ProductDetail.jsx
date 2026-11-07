import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProduct } from '../api/productsApi';
import { useCartStore } from '../store/cartStore';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const fetchFn = useCallback((signal) => fetchProduct(id, signal), [id]);
  const { loading, error, data: product } = useFetch(fetchFn, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="error-page">
        <h2>Product Not Found</h2>
        <p>{error || 'The requested product does not exist.'}</p>
        <button type="button" onClick={() => navigate('/products')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button type="button" onClick={() => navigate('/products')} className="back-btn">
        &larr; Back to Products
      </button>

      <div className="product-detail-card">
        <img src={product.thumbnail} alt={product.title} className="detail-image" />
        <div className="detail-content">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">${product.price.toFixed(2)}</p>

          <button type="button" onClick={() => addItem(product)} className="add-cart-btn-large">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}