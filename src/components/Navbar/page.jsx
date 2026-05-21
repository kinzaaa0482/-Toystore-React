import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem('ts_user');

  const handleLogout = () => {
    localStorage.removeItem('ts_user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🧸 ToyStore</Link>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li>
          <Link
            to="/"
            className={isActive('/') || isActive('/home') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/products"
            className={isActive('/products') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
        </li>

        <li
          className="dropdown"
          onMouseEnter={() => setCatOpen(true)}
          onMouseLeave={() => setCatOpen(false)}
        >
          <span className="nav-link-text">Categories ▾</span>
          {catOpen && (
            <div className="dropdown-menu">
              {['dolls', 'cars', 'teddybears', 'puzzles', 'kitchen'].map(cat => (
                <Link
                  key={cat}
                  to={`/products?cat=${cat}`}
                  onClick={() => { setCatOpen(false); setMenuOpen(false); }}
                >
                  {cat === 'teddybears' ? 'Teddy Bears'
                    : cat === 'kitchen' ? 'Kitchen Sets'
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Link>
              ))}
            </div>
          )}
        </li>

        <li>
          <Link
            to="/reviews"
            className={isActive('/reviews') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Reviews
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            className={isActive('/cart') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            🛒 Cart{' '}
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className={isActive('/contact') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard"
            className={isActive('/dashboard') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </li>

        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => { navigate('/login'); setMenuOpen(false); }}>Login</button>
          )}
        </li>
      </ul>

      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(o => !o)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );
}
