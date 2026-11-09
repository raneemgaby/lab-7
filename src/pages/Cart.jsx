import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Cart() { //display the shopping cart
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);  //Derived total price during render

  if (items.length === 0) {
    return (
      <div className="empty-cart-page">
        <h2>Your Cart is Empty</h2>
        <p>You haven't added any products to your cart yet.</p>
        <Link to="/products" className="cta-button">
          Browse Products
        </Link>
      </div>
    );
  }

  return ( //everything below is rendered if there are items in the cart
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <p className="item-price">${item.price.toFixed(2)} each</p>
            </div>

            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => setQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <div className="cart-summary-actions">
          <button type="button" onClick={clear} className="clear-btn">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}