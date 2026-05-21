import { useState } from 'react'
import Footer from '../../components/Footer/page'

interface StockItem {
  id: string
  name: string
  category: string
  price: number
  qty: number
}

const INITIAL_STOCK: StockItem[] = [
  { id: '#001', name: 'Barbie Fashion Doll', category: 'Dolls', price: 2400, qty: 80 },
  { id: '#002', name: 'RC Racing Car', category: 'Cars', price: 3100, qty: 65 },
  { id: '#003', name: 'Giant Teddy Bear', category: 'Teddy Bears', price: 2800, qty: 50 },
  { id: '#004', name: '1000-Piece Puzzle', category: 'Puzzles', price: 950, qty: 90 },
  { id: '#005', name: 'Deluxe Kitchen Set', category: 'Kitchen Sets', price: 4200, qty: 45 },
]

export default function Insert() {
  const [stock, setStock] = useState<StockItem[]>(INITIAL_STOCK)
  const [nextId, setNextId] = useState(6)

  const [pname, setPname] = useState('')
  const [pcat, setPcat] = useState('dolls')
  const [pprice, setPprice] = useState('')
  const [pqty, setPqty] = useState('')
  const [page, setPage] = useState('')
  const [pdesc, setPdesc] = useState('')
  const [pimg, setPimg] = useState('')

  const insertProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: StockItem = {
      id: `#00${nextId}`,
      name: pname,
      category: pcat,
      price: parseInt(pprice),
      qty: parseInt(pqty),
    }
    setStock(prev => [...prev, newItem])
    setNextId(n => n + 1)
    alert('Product added: ' + pname)
    setPname(''); setPcat('dolls'); setPprice(''); setPqty(''); setPage(''); setPdesc(''); setPimg('')
  }

  const deleteItem = (id: string) => {
    setStock(prev => prev.filter(s => s.id !== id))
  }

  return (
    <>
      <div className="page">
        <h1>➕ Insert New Stock</h1>
        <p>Add a new product to the ToyStore inventory.</p>

        <div className="form-container" style={{ maxWidth: '600px' }}>
          <form onSubmit={insertProduct}>
            <div><label>Product Name</label><input type="text" placeholder="e.g. Barbie Dream House" value={pname} onChange={e => setPname(e.target.value)} required /></div>
            <div>
              <label>Category</label>
              <div className="select-container">
                <select value={pcat} onChange={e => setPcat(e.target.value)}>
                  <option value="dolls">Dolls</option>
                  <option value="cars">Cars</option>
                  <option value="teddybears">Teddy Bears</option>
                  <option value="puzzles">Puzzles</option>
                  <option value="kitchen">Kitchen Sets</option>
                </select>
              </div>
            </div>
            <div><label>Price (Rs)</label><input type="number" placeholder="2000" min="1" value={pprice} onChange={e => setPprice(e.target.value)} required /></div>
            <div><label>Stock Quantity</label><input type="number" placeholder="50" min="1" value={pqty} onChange={e => setPqty(e.target.value)} required /></div>
            <div><label>Age Range</label><input type="text" placeholder="e.g. 3+ years" value={page} onChange={e => setPage(e.target.value)} /></div>
            <div><label>Description</label><textarea placeholder="Short product description…" value={pdesc} onChange={e => setPdesc(e.target.value)} /></div>
            <div><label>Image URL</label><input type="url" placeholder="https://…" value={pimg} onChange={e => setPimg(e.target.value)} /></div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit">Add Product</button>
              <button type="button" style={{ background: 'var(--text-muted-color)' }} onClick={() => { setPname(''); setPprice(''); setPqty(''); }}>Reset</button>
            </div>
          </form>
        </div>

        <h2 style={{ marginTop: '40px' }}>📋 Existing Inventory</h2>
        <div className="table-container">
          <table style={{ minWidth: '600px', maxWidth: '1100px' }}>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
            </thead>
            <tbody id="stock-table">
              {stock.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>Rs {item.price.toLocaleString()}</td>
                  <td>{item.qty}</td>
                  <td>
                    <button style={{ padding: '4px 10px', fontSize: '0.8rem' }}>Edit</button>{' '}
                    <button style={{ padding: '4px 10px', fontSize: '0.8rem', background: '#e74c3c' }} onClick={() => deleteItem(item.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}
