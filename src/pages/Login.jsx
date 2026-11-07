import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('demo@student.com');
  const [password, setPassword] = useState('demo123456');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const user = await login(username, password);
      loginUser(user);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <p className="demo-hint">
        Demo account: <code>demo@student.com</code> / <code>demo123456</code>
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        {errorMessage && <div className="error-banner">{errorMessage}</div>}

        <div className="form-group">
          <label htmlFor="username">Username / Email</label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}