import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="header-logo">🧸 ToyStore</Link>
        <p className="header-tagline">Pakistan's favourite toy shop online</p>
      </div>
    </header>
  );
}
