import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  img: string
  qty: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'qty'>) => void
  removeFromCart: (id: string) => void
  changeQty: (id: string, delta: number) => void
  clearCart: () => void
  cartCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ts_cart') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('ts_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.id === item.id)
      if (idx > -1) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 }
        return updated
      }
      return [...prev, { ...item, qty: 1 }]
    })
    alert('Added to cart: ' + item.name)
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  const changeQty = (id: string, delta: number) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.id === id)
      if (idx < 0) return prev
      const updated = [...prev]
      updated[idx] = { ...updated[idx], qty: Math.max(1, updated[idx].qty + delta) }
      return updated
    })
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
