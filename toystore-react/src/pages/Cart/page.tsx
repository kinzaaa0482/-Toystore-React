import { NavLink } from 'react-router-dom'
import { useCart } from '../../CartContext'
import Footer from '../../components/Footer/page'

export default function Cart() {
  const { cart, removeFromCart, changeQty, clearCart } = useCart()

  const subtotal = cart.reduce((s, item) => s + item.price * item.qty, 0)

  const checkout = () => {
    alert('Order placed! Thank you for shopping at ToyStore 🧸')
    clearCart()
  }

  return (
    <>
      <div className="page">
        <h1>🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '4rem' }}>🛒</div>
            <h2>Your cart is empty</h2>
            <NavLink to="/products" className="link-button">Start Shopping</NavLink>
          </div>
        ) : (
          <>
            <div id="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <div style={{ flex: 1 }}>
                    <h3>{item.name}</h3>
                    <p>Rs {item.price.toLocaleString()} each</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                      <button onClick={() => changeQty(item.id, -1)}>−</button>
                      <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 700 }}>{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)}>+</button>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: '#e74c3c', marginLeft: '8px' }}>Remove</button>
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
              <p>Total: <strong>Rs {(subtotal + 200).toLocaleString()}</strong></p>
              <button onClick={checkout} style={{ width: '100%', marginTop: '12px' }}>Proceed to Checkout</button>
              <NavLink to="/products" className="link-button" style={{ width: '100%', textAlign: 'center', marginTop: '10px', display: 'block' }}>Continue Shopping</NavLink>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
