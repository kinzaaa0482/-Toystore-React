import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './CartContext'
import { ThemeProvider } from './ThemeContext'
import Navbar from './components/Navbar/page'
import Home from './pages/Home/page'
import Login from './pages/Login/page'
import Signup from './pages/Signup/page'
import Dashboard from './pages/Dashboard/page'
import Contact from './pages/Contact/page'
import Cart from './pages/Cart/page'
import Insert from './pages/Insert/page'
import './App.css'

function AppLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/insert" element={<Insert />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
