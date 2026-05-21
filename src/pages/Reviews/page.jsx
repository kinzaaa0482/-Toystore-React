import { useState } from 'react';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Ayesha Tariq',
    initials: 'AT',
    grad: 'linear-gradient(135deg,#6c63ff,#ec4899)',
    product: 'Barbie Fashion Doll',
    rating: 5,
    date: 'May 15, 2026',
    text: 'My daughter absolutely loves this doll! The quality is amazing and it arrived beautifully packed. Will definitely order again from ToyStore.',
  },
  {
    id: 2,
    name: 'Usman Raza',
    initials: 'UR',
    grad: 'linear-gradient(135deg,#f97316,#f59e0b)',
    product: 'RC Racing Car',
    rating: 5,
    date: 'May 12, 2026',
    text: 'The RC car is super fast and my son hasn\'t put it down since it arrived. Great build quality for the price. Highly recommended!',
  },
  {
    id: 3,
    name: 'Fatima Malik',
    initials: 'FM',
    grad: 'linear-gradient(135deg,#22c55e,#06b6d4)',
    product: 'Deluxe Kitchen Play Set',
    rating: 5,
    date: 'May 10, 2026',
    text: 'Bought this for my 4-year-old and she plays with it every single day. The sounds and lights make it so interactive. Worth every rupee!',
  },
  {
    id: 4,
    name: 'Hassan Ali',
    initials: 'HA',
    grad: 'linear-gradient(135deg,#3b82f6,#6c63ff)',
    product: 'Giant Teddy Bear',
    rating: 4,
    date: 'May 8, 2026',
    text: 'Very soft and fluffy teddy bear. My kid sleeps with it every night. Delivery was fast too. Only minor issue was the packaging could be better.',
  },
  {
    id: 5,
    name: 'Sara Khan',
    initials: 'SK',
    grad: 'linear-gradient(135deg,#06b6d4,#3b82f6)',
    product: '1000-Piece Jigsaw Puzzle',
    rating: 5,
    date: 'May 5, 2026',
    text: 'Excellent puzzle for the whole family. We spent the whole weekend on it. Great quality pieces that fit perfectly. ToyStore never disappoints!',
  },
  {
    id: 6,
    name: 'Bilal Ahmed',
    initials: 'BA',
    grad: 'linear-gradient(135deg,#ec4899,#f97316)',
    product: 'Mini Teddy Pack (3pc)',
    rating: 4,
    date: 'May 2, 2026',
    text: 'Cute little teddies, great value for money. Bought as a gift and the recipient loved them. Would order again.',
  },
  {
    id: 7,
    name: 'Zara Hussain',
    initials: 'ZH',
    grad: 'linear-gradient(135deg,#f59e0b,#22c55e)',
    product: 'Baby Doll Set',
    rating: 5,
    date: 'Apr 28, 2026',
    text: 'Perfect for my 2-year-old niece. Very soft and safe. No sharp edges at all. The accessories included are a bonus. 5 stars!',
  },
  {
    id: 8,
    name: 'Ali Nawaz',
    initials: 'AN',
    grad: 'linear-gradient(135deg,#6c63ff,#22c55e)',
    product: 'Die-Cast Car Set (6pc)',
    rating: 4,
    date: 'Apr 25, 2026',
    text: 'Nice set of metal cars. Good detail and finish. My boys love collecting them. Delivery was on time as well.',
  },
];

function Stars({ rating, size = '1.1rem' }) {
  return (
    <span style={{ fontSize: size, letterSpacing: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#f59e0b' : '#d1d5db' }}>★</span>
      ))}
    </span>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [form, setForm] = useState({ name: '', product: '', rating: 5, text: '' });
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const grads = [
      'linear-gradient(135deg,#6c63ff,#ec4899)',
      'linear-gradient(135deg,#22c55e,#06b6d4)',
      'linear-gradient(135deg,#f97316,#f59e0b)',
      'linear-gradient(135deg,#3b82f6,#6c63ff)',
    ];
    const newReview = {
      id: Date.now(),
      name: form.name,
      initials,
      grad: grads[Math.floor(Math.random() * grads.length)],
      product: form.product,
      rating: Number(form.rating),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      text: form.text,
    };
    setReviews(prev => [newReview, ...prev]);
    setForm({ name: '', product: '', rating: 5, text: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const ratingCounts = [5, 4, 3, 2, 1].map(r => ({
    r,
    count: reviews.filter(rv => rv.rating === r).length,
  }));

  return (
    <div className="page">
      <h1>⭐ Customer Reviews</h1>
      <p style={{ color: 'var(--text-muted-color)', marginBottom: '40px' }}>
        Real reviews from real ToyStore customers across Pakistan.
      </p>

      {/* ── RATING SUMMARY ── */}
      <div style={{
        display: 'flex',
        gap: '32px',
        flexWrap: 'wrap',
        alignItems: 'center',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-muted-color)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '48px',
      }}>
        <div style={{ textAlign: 'center', minWidth: '120px' }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--brand-primary-color)', lineHeight: 1 }}>
            {avgRating}
          </div>
          <Stars rating={Math.round(avgRating)} size="1.4rem" />
          <div style={{ color: 'var(--text-muted-color)', marginTop: '6px', fontSize: '0.9rem' }}>
            {reviews.length} reviews
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '200px' }}>
          {ratingCounts.map(({ r, count }) => (
            <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.85rem', minWidth: '40px', color: 'var(--text-muted-color)' }}>{r} ★</span>
              <div style={{
                flex: 1,
                height: '8px',
                background: 'var(--border-muted-color)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(count / reviews.length) * 100}%`,
                  height: '100%',
                  background: '#f59e0b',
                  borderRadius: '4px',
                  transition: 'width 0.4s',
                }} />
              </div>
              <span style={{ fontSize: '0.85rem', minWidth: '24px', color: 'var(--text-muted-color)' }}>{count}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', minWidth: '140px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '4px' }}>😊</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
            {Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}% Positive
          </div>
          <div style={{ color: 'var(--text-muted-color)', fontSize: '0.85rem' }}>Would recommend</div>
        </div>
      </div>

      {/* ── REVIEW CARDS ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '56px',
      }}>
        {reviews.map(r => (
          <div key={r.id} className="card" style={{ padding: '24px', width: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: r.grad,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                flexShrink: 0,
              }}>
                {r.initials}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted-color)' }}>{r.date}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Stars rating={r.rating} />
              </div>
            </div>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--brand-primary-color)',
              marginBottom: '8px',
              background: 'rgba(249,115,22,0.1)',
              display: 'inline-block',
              padding: '2px 10px',
              borderRadius: '20px',
            }}>
              {r.product}
            </div>
            <p style={{ color: 'var(--text-muted-color)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              "{r.text}"
            </p>
          </div>
        ))}
      </div>

      {/* ── WRITE A REVIEW ── */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-muted-color)',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        <h2 style={{ marginBottom: '8px' }}>✍️ Write a Review</h2>
        <p style={{ color: 'var(--text-muted-color)', marginBottom: '24px' }}>
          Share your experience with other parents.
        </p>

        {submitted && (
          <div style={{
            background: '#dcfce7',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 600,
          }}>
            ✅ Thank you! Your review has been posted.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Ali Raza"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-muted-color)', background: 'var(--bg-primary)', color: 'var(--text-primary-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Product</label>
            <input
              type="text"
              name="product"
              placeholder="e.g. RC Racing Car"
              value={form.product}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-muted-color)', background: 'var(--bg-primary)', color: 'var(--text-primary-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Rating</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[5, 4, 3, 2, 1].map(n => (
                <label key={n} style={{ cursor: 'pointer', fontSize: '1.6rem', color: Number(form.rating) >= n ? '#f59e0b' : '#d1d5db' }}>
                  <input
                    type="radio"
                    name="rating"
                    value={n}
                    checked={Number(form.rating) === n}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  ★
                </label>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Your Review</label>
            <textarea
              name="text"
              placeholder="Tell us about your experience…"
              value={form.text}
              onChange={handleChange}
              required
              rows={4}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-muted-color)', background: 'var(--bg-primary)', color: 'var(--text-primary-color)', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px' }}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
