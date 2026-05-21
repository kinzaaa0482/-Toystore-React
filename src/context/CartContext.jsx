import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const DEFAULT_CART = [
  { id: 'd1', name: 'Barbie Fashion Doll',    price: 2400, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&h=300&fit=crop', qty: 1 },
  { id: 'c1', name: 'RC Racing Car',           price: 3100, img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop', qty: 2 },
  { id: 'k1', name: 'Deluxe Kitchen Play Set', price: 4200, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', qty: 1 },
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ts_cart') || 'null');
      return saved && saved.length > 0 ? saved : DEFAULT_CART;
    } catch {
      return DEFAULT_CART;
    }
  });

  useEffect(() => {
    localStorage.setItem('ts_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.id === item.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 };
        return updated;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    alert('Added to cart: ' + item.name);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
