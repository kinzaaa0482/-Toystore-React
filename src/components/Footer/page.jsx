import { Link } from 'react-router-dom';

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
          <Link to="/products">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h2>Categories</h2>
          <Link to="/products?cat=dolls">Dolls</Link>
          <Link to="/products?cat=cars">Cars</Link>
          <Link to="/products?cat=puzzles">Puzzles</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <p>support@toystore.pk</p>
          <p>+92 300 1234567</p>
        </div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        © 2025 ToyStore. All rights reserved.
      </p>
    </footer>
  );
}
