import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
import Home from './pages/Home/page';
import Products from './pages/Products/page';
import Login from './pages/Login/page';
import Signup from './pages/Signup/page';
import Contact from './pages/Contact/page';
import Cart from './pages/Cart/page';
import Dashboard from './pages/Dashboard/page';
import Insert from './pages/Insert/page';
import Reviews from './pages/Reviews/page';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"          element={<Layout><Home /></Layout>} />
            <Route path="/home"      element={<Layout><Home /></Layout>} />
            <Route path="/products"  element={<Layout><Products /></Layout>} />
            <Route path="/reviews"   element={<Layout><Reviews /></Layout>} />
            <Route path="/login"     element={<Layout><Login /></Layout>} />
            <Route path="/signup"    element={<Layout><Signup /></Layout>} />
            <Route path="/contact"   element={<Layout><Contact /></Layout>} />
            <Route path="/cart"      element={<Layout><Cart /></Layout>} />
            <Route path="/insert"    element={<Layout><Insert /></Layout>} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="*"          element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}
