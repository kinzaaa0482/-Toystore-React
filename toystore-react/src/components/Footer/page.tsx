import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h1>🧸 ToyStore</h1>
          <p>Pakistan's favourite toy shop online.</p>
        </div>
        <div>
          <h2>Links</h2>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div>
          <h2>Categories</h2>
          <NavLink to="/products?cat=dolls">Dolls</NavLink>
          <NavLink to="/products?cat=cars">Cars</NavLink>
          <NavLink to="/products?cat=puzzles">Puzzles</NavLink>
        </div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '16px' }}>© 2025 ToyStore. All rights reserved.</p>
    </footer>
  )
}
