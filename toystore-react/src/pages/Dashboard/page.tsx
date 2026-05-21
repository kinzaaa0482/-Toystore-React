import { useEffect, useRef } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Footer from '../../components/Footer/page'

function drawBarChart(canvasId: string, labels: string[], values: number[], title: string) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = canvas.width, H = canvas.height
  const pad = 50, barW = (W - pad * 2) / labels.length - 12
  const maxVal = Math.max(...values, 1)
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = '#004E89'; ctx.font = 'bold 14px Segoe UI'
  ctx.textAlign = 'center'; ctx.fillText(title, W / 2, 22)
  ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, H - pad); ctx.lineTo(W - pad, H - pad); ctx.stroke()
  const colors = ['#FF6B35', '#004E89', '#1A936F', '#F7C59F', '#EFEFD0', '#FF6B35']
  labels.forEach((lbl, i) => {
    const x = pad + i * ((W - pad * 2) / labels.length) + 6
    const barH = (values[i] / maxVal) * (H - pad * 2)
    ctx.fillStyle = colors[i % colors.length]
    ctx.fillRect(x, H - pad - barH, barW, barH)
    ctx.fillStyle = '#333'; ctx.font = '11px Segoe UI'; ctx.textAlign = 'center'
    ctx.fillText(lbl, x + barW / 2, H - pad + 14)
    ctx.fillStyle = '#004E89'; ctx.font = 'bold 11px Segoe UI'
    ctx.fillText(String(values[i]), x + barW / 2, H - pad - barH - 4)
  })
}

export default function Dashboard() {
  const navigate = useNavigate()
  const chartsDrawn = useRef(false)

  useEffect(() => {
    if (!chartsDrawn.current) {
      drawBarChart('salesChart', ['Dolls', 'Cars', 'Teddy', 'Puzzles', 'Kitchen'], [42, 31, 27, 18, 22], 'Monthly Sales by Category')
      drawBarChart('stockChart', ['Dolls', 'Cars', 'Teddy', 'Puzzles', 'Kitchen'], [80, 65, 50, 90, 45], 'Current Stock Levels')
      chartsDrawn.current = true
    }
  }, [])

  return (
    <>
      <div className="page">
        <h1>📊 Admin Dashboard</h1>
        <p>Welcome back! Here's your store overview.</p>

        <div className="card-container">
          <div className="stat-card" onClick={() => navigate('/products')}>
            <div className="stat-icon">📦</div>
            <h3>248</h3>
            <p>Total Products</p>
          </div>
          <div className="stat-card" onClick={() => navigate('/products')}>
            <div className="stat-icon">🛒</div>
            <h3>53</h3>
            <p>Orders Today</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <h3>1,204</h3>
            <p>Customers</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <h3>Rs 84,200</h3>
            <p>Revenue (Month)</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <h3>4.8</h3>
            <p>Avg Rating</p>
          </div>
        </div>

        <h2>Stock Management</h2>
        <div className="card-container">
          <div className="card" style={{ alignItems: 'center', padding: '24px', cursor: 'pointer' }} onClick={() => navigate('/products')}>
            <div style={{ fontSize: '2.5rem' }}>👁️</div>
            <h3>View All Stock</h3>
            <p>Browse all products in inventory</p>
            <button>View Stock</button>
          </div>
          <div className="card" style={{ alignItems: 'center', padding: '24px', cursor: 'pointer' }} onClick={() => navigate('/insert')}>
            <div style={{ fontSize: '2.5rem' }}>➕</div>
            <h3>Insert New Stock</h3>
            <p>Add a new toy to the store</p>
            <button>Add Product</button>
          </div>
          <div className="card" style={{ alignItems: 'center', padding: '24px', cursor: 'pointer' }} onClick={() => navigate('/products')}>
            <div style={{ fontSize: '2.5rem' }}>✏️</div>
            <h3>Update Stock</h3>
            <p>Edit existing product details</p>
            <button>Update</button>
          </div>
          <div className="card" style={{ alignItems: 'center', padding: '24px', cursor: 'pointer' }} onClick={() => navigate('/products')}>
            <div style={{ fontSize: '2.5rem' }}>🗑️</div>
            <h3>Delete Stock</h3>
            <p>Remove products from inventory</p>
            <button>Delete</button>
          </div>
        </div>

        <h2>📈 Sales by Category</h2>
        <div className="chart-container">
          <canvas id="salesChart" width={700} height={300}></canvas>
        </div>

        <h2>📦 Stock Levels</h2>
        <div className="chart-container">
          <canvas id="stockChart" width={700} height={280}></canvas>
        </div>

        <h2>🛍️ Recent Orders</h2>
        <div className="table-container">
          <table style={{ minWidth: '500px', maxWidth: '900px' }}>
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>#1021</td><td>Ali Raza</td><td>Barbie Doll Set</td><td>Rs 2,400</td><td><span className="badge">Delivered</span></td></tr>
              <tr><td>#1022</td><td>Sara Khan</td><td>RC Racing Car</td><td>Rs 3,100</td><td><span className="badge">Processing</span></td></tr>
              <tr><td>#1023</td><td>Usman Ahmed</td><td>Teddy Bear XL</td><td>Rs 1,800</td><td><span className="badge">Delivered</span></td></tr>
              <tr><td>#1024</td><td>Fatima Malik</td><td>Puzzle 1000 pcs</td><td>Rs 950</td><td><span className="badge">Shipped</span></td></tr>
              <tr><td>#1025</td><td>Hassan Ali</td><td>Kitchen Play Set</td><td>Rs 2,200</td><td><span className="badge">Processing</span></td></tr>
            </tbody>
          </table>
        </div>

        <h2>⚡ Quick Links</h2>
        <div className="card-container">
          <NavLink to="/contact" className="link-button">📧 Contact Support</NavLink>
          <NavLink to="/cart" className="link-button">🛒 View Cart</NavLink>
          <NavLink to="/products" className="link-button">🏪 Browse Store</NavLink>
          <NavLink to="/insert" className="link-button">📋 Manage Stock</NavLink>
        </div>
      </div>
      <Footer />
    </>
  )
}
