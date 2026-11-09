import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';

export default function NavBar({ theme, onToggleTheme }) {
  const { user, logoutUser } = useAuth();
  const cartItemCount = useCartStore((state) => //Selector returns primitive number of items to prevent re-renders on unrelated cart changes
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return ( //main navigation bar component with links to home,products,cart and login/log out functionality
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/">MyStore</NavLink>
      </div>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
          Products
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
          Cart ({cartItemCount})
        </NavLink>
      </div>

      <div className="nav-actions">
        <button type="button" onClick={onToggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {user ? (
          <div className="user-menu">
            <span>Welcome, <strong>{user.username}</strong></span>
            <button type="button" onClick={logoutUser} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}