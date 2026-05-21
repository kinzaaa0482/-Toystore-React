import { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_STOCK = [
  { id: '#001', name: 'Barbie Fashion Doll', cat: 'Dolls',        price: 2400, qty: 80 },
  { id: '#002', name: 'RC Racing Car',       cat: 'Cars',         price: 3100, qty: 65 },
  { id: '#003', name: 'Giant Teddy Bear',    cat: 'Teddy Bears',  price: 2800, qty: 50 },
  { id: '#004', name: '1000-Piece Puzzle',   cat: 'Puzzles',      price: 950,  qty: 90 },
  { id: '#005', name: 'Deluxe Kitchen Set',  cat: 'Kitchen Sets', price: 4200, qty: 45 },
];

export default function Insert() {
  const [form, setForm] = useState({ name: '', cat: 'dolls', price: '', qty: '', age: '', desc: '', img: '' });
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [nextId, setNextId] = useState(6);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = {
      id: `#00${nextId}`,
      name: form.name,
      cat: form.cat.charAt(0).toUpperCase() + form.cat.slice(1),
      price: parseInt(form.price),
      qty: parseInt(form.qty),
    };
    setStock(prev => [...prev, newRow]);
    setNextId(n => n + 1);
    alert('Product added: ' + form.name);
    setForm({ name: '', cat: 'dolls', price: '', qty: '', age: '', desc: '', img: '' });
  };

  const deleteRow = (id) => setStock(prev => prev.filter(r => r.id !== id));

  return (
    <div className="page">
      <h1>➕ Insert New Stock</h1>
      <p>Add a new product to the ToyStore inventory.</p>

      <div className="form-container" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name</label>
            <input type="text" name="name" placeholder="e.g. Barbie Dream House" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Category</label>
            <div className="select-container">
              <select name="cat" value={form.cat} onChange={handleChange}>
                <option value="dolls">Dolls</option>
                <option value="cars">Cars</option>
                <option value="teddybears">Teddy Bears</option>
                <option value="puzzles">Puzzles</option>
                <option value="kitchen">Kitchen Sets</option>
              </select>
            </div>
          </div>
          <div>
            <label>Price (Rs)</label>
            <input type="number" name="price" placeholder="2000" min="1" value={form.price} onChange={handleChange} required />
          </div>
          <div>
            <label>Stock Quantity</label>
            <input type="number" name="qty" placeholder="50" min="1" value={form.qty} onChange={handleChange} required />
          </div>
          <div>
            <label>Age Range</label>
            <input type="text" name="age" placeholder="e.g. 3+ years" value={form.age} onChange={handleChange} />
          </div>
          <div>
            <label>Description</label>
            <textarea name="desc" placeholder="Short product description…" value={form.desc} onChange={handleChange} />
          </div>
          <div>
            <label>Image URL</label>
            <input type="url" name="img" placeholder="https://…" value={form.img} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit">Add Product</button>
            <button
              type="reset"
              style={{ background: 'var(--text-muted-color)' }}
              onClick={() => setForm({ name: '', cat: 'dolls', price: '', qty: '', age: '', desc: '', img: '' })}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <h2 style={{ marginTop: '40px' }}>📋 Existing Inventory</h2>
      <div className="table-container">
        <table style={{ minWidth: '600px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stock.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.cat}</td>
                <td>Rs {row.price.toLocaleString()}</td>
                <td>{row.qty}</td>
                <td>
                  <button
                    style={{ padding: '4px 10px', fontSize: '0.8rem', marginRight: '6px' }}
                    onClick={() => alert(`Edit: ${row.name}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ padding: '4px 10px', fontSize: '0.8rem', background: '#e74c3c' }}
                    onClick={() => deleteRow(row.id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Link to="/dashboard" className="link-button">← Back to Dashboard</Link>
      </div>
    </div>
  );
}
