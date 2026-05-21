import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, changeQty, clearCart } = useCart();

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const total = subtotal + 200;

  const handleCheckout = () => {
    alert('Order placed! Thank you for shopping at ToyStore 🧸');
    clearCart();
  };

  return (
    <div className="page">
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '4rem' }}>🛒</div>
          <h2>Your cart is empty</h2>
          <Link to="/products" className="link-button">Start Shopping</Link>
        </div>
      ) : (
        <>
          <div id="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.img}
                  alt={item.name}
                  onError={e => { e.target.src = 'https://via.placeholder.com/80x80?text=Toy'; }}
                />
                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>Rs {item.price.toLocaleString()} each</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      style={{ padding: '4px 12px', minWidth: '32px' }}
                    >−</button>
                    <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 700 }}>{item.qty}</span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      style={{ padding: '4px 12px', minWidth: '32px' }}
                    >+</button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: '#e74c3c', marginLeft: '8px' }}
                    >Remove</button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--brand-primary-color)' }}>
                  Rs {(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Subtotal: <strong>Rs {subtotal.toLocaleString()}</strong></p>
            <p>Delivery: <strong>Rs 200</strong></p>
            <p>Total: <strong>Rs {total.toLocaleString()}</strong></p>
            <button onClick={handleCheckout} style={{ width: '100%', marginTop: '12px' }}>
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="link-button"
              style={{ width: '100%', textAlign: 'center', marginTop: '10px', display: 'block' }}
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
