import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';

const FEATURED = [
  { id: 'd1', name: 'Barbie Fashion Doll',    price: 2400, img: img2, badge: 'Dolls'   },
  { id: 'c1', name: 'RC Racing Car',           price: 3100, img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop', badge: 'Cars' },
  { id: 'k1', name: 'Deluxe Kitchen Play Set', price: 4200, img: img3, badge: 'Kitchen' },
  { id: 't1', name: 'Giant Teddy Bear',        price: 2800, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&h=300&fit=crop', badge: 'Teddy Bears' },
];

const CATEGORIES = [
  { label: 'Dolls',        emoji: '🎀', cat: 'dolls'      },
  { label: 'Cars',         emoji: '🚗', cat: 'cars'       },
  { label: 'Teddy Bears',  emoji: '🐻', cat: 'teddybears' },
  { label: 'Puzzles',      emoji: '🧩', cat: 'puzzles'    },
  { label: 'Kitchen Sets', emoji: '🍳', cat: 'kitchen'    },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--brand-fourth-color) 0%, #2d3a8c 100%)',
        color: '#fff',
        padding: '80px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🧸</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0 0 16px' }}>
          Pakistan's Favourite Toy Store
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '560px', margin: '0 auto 32px' }}>
          Discover thousands of toys for every age — from cuddly teddies to racing cars. Safe, fun & delivered to your door.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" style={{
            background: 'var(--brand-primary-color)',
            color: '#ffffffff',
            padding: '14px 32px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
          }}>
            🛍️ Shop Now
          </Link>
          <Link to="/reviews" style={{
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            border: '2px solid rgba(255,255,255,0.4)',
          }}>
            ⭐ Read Reviews
          </Link>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-muted-color)',
        padding: '24px 32px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '40px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {[
            { icon: '🚚', text: 'Free Delivery over Rs 3,000' },
            { icon: '🔒', text: '100% Secure Payments' },
            { icon: '↩️', text: 'Easy 7-Day Returns' },
            { icon: '✅', text: 'Certified Safe Toys' },
          ].map(b => (
            <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
              <span style={{ fontSize: '1.6rem' }}>{b.icon}</span>
              <span style={{ color: 'var(--text-primary-color)' }}>{b.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="page" style={{ paddingBottom: '0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>🗂️ Shop by Category</h2>
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}>
          {CATEGORIES.map(c => (
            <Link
              key={c.cat}
              to={`/products?cat=${c.cat}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-card)',
                border: '2px solid var(--border-muted-color)',
                borderRadius: '16px',
                padding: '24px 32px',
                textDecoration: 'none',
                color: 'var(--text-primary-color)',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                minWidth: '120px',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <span style={{ fontSize: '2.4rem' }}>{c.emoji}</span>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="page" style={{ paddingTop: '0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>🌟 Featured Products</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted-color)', marginBottom: '32px' }}>
          Hand-picked favourites loved by kids across Pakistan
        </p>
        <div className="card-container">
          {FEATURED.map(p => (
            <div key={p.id} className="card product-card">
              <img
                src={p.img}
                alt={p.name}
                onError={e => { e.target.src = 'https://via.placeholder.com/240x180?text=Toy'; }}
              />
              <h3>{p.name}</h3>
              <h4>Rs {p.price.toLocaleString()}</h4>
              <span className="badge">{p.badge}</span>
              <button
                style={{ marginTop: '10px' }}
                onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, img: p.img })}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/products" style={{
            background: 'var(--brand-primary-color)',
            color: '#fff',
            padding: '12px 32px',
            borderRadius: '8px',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '1rem',
          }}>
            View All Products →
          </Link>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{
        background: 'var(--bg-card)',
        padding: '60px 32px',
        marginTop: '40px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>💛 Why Parents Love ToyStore</h2>
        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {[
            { icon: '🛡️', title: 'Safety First',       desc: 'All toys are tested and certified safe for children of all ages.' },
            { icon: '💰', title: 'Best Prices',         desc: 'Competitive prices with regular deals and discounts every week.' },
            { icon: '🎁', title: 'Gift Wrapping',       desc: 'Free gift wrapping on orders above Rs 2,000. Perfect for birthdays!' },
            { icon: '⭐', title: '4.8★ Rated',          desc: 'Over 1,200 happy customers have rated us 4.8 out of 5 stars.' },
          ].map(w => (
            <div key={w.title} className="card" style={{ maxWidth: '220px', textAlign: 'center', padding: '32px 24px' }}>
              <div style={{ fontSize: '2.4rem', marginBottom: '12px' }}>{w.icon}</div>
              <h3 style={{ marginBottom: '8px' }}>{w.title}</h3>
              <p style={{ color: 'var(--text-muted-color)', fontSize: '0.9rem' }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: 'linear-gradient(135deg, #f97316, #ec4899)',
        color: '#fff',
        padding: '60px 32px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>🎉 New Arrivals Every Week!</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '28px' }}>
          Sign up and be the first to know about new toys, deals & exclusive offers.
        </p>
        <Link to="/signup" style={{
          background: '#fff',
          color: '#f97316',
          padding: '14px 36px',
          borderRadius: '8px',
          fontWeight: 800,
          fontSize: '1rem',
          textDecoration: 'none',
        }}>
          Create Free Account
        </Link>
      </section>
    </div>
  );
}
