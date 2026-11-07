import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Layout() {
  const [theme, setTheme] = useLocalStorage('theme_preference', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}-theme`}>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Multi-Page React Shop</p>
      </footer>
    </div>
  );
}