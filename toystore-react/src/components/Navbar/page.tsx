import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../CartContext'
import { useTheme } from '../../ThemeContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const { toggleTheme } = useTheme()
  const navigate = useNavigate()

  const isLoggedIn = () => !!localStorage.getItem('ts_user')

  const handleAuthBtn = () => {
    if (isLoggedIn()) {
      localStorage.removeItem('ts_user')
      navigate('/login')
    } else {
      navigate('/login')
    }
  }

  return (
    <nav>
      <NavLink to="/">🧸 ToyStore</NavLink>
      <ul id="nav-links" className={menuOpen ? 'open' : ''}>
        <li><NavLink to="/products">Shop</NavLink></li>
        <li className="dropdown">
          <a href="#">Categories ▾</a>
          <div className="dropdown-menu">
            <NavLink to="/products?cat=dolls">Dolls</NavLink>
            <NavLink to="/products?cat=cars">Cars</NavLink>
            <NavLink to="/products?cat=teddybears">Teddy Bears</NavLink>
            <NavLink to="/products?cat=puzzles">Puzzles</NavLink>
            <NavLink to="/products?cat=kitchen">Kitchen Sets</NavLink>
          </div>
        </li>
        <li>
          <NavLink to="/cart">
            🛒 Cart <span id="cart-count" className="badge">{cartCount}</span>
          </NavLink>
        </li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><button onClick={toggleTheme}>🌙</button></li>
        <li>
          <button onClick={handleAuthBtn}>
            {isLoggedIn() ? 'Logout' : 'Login'}
          </button>
        </li>
      </ul>
      <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)}>☰</button>
    </nav>
  )
}
