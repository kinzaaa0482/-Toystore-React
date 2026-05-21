import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../../CartContext'
import Footer from '../../components/Footer/page'

interface Product {
  id: string
  name: string
  nameLower: string
  category: string
  price: number
  img: string
  description: string
}

const ALL_PRODUCTS: Product[] = [
  { id: 'd1', name: 'Barbie Fashion Doll', nameLower: 'barbie fashion doll', category: 'dolls', price: 2400, img: '/images/2.png', description: 'Classic Barbie with stylish outfits – ages 3+' },
  { id: 'd2', name: 'Baby Doll Set', nameLower: 'baby doll set', category: 'dolls', price: 1800, img: '/images/1.png', description: 'Soft & cuddly baby doll with accessories – ages 2+' },
  { id: 'c1', name: 'RC Racing Car', nameLower: 'rc racing car', category: 'cars', price: 3100, img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop', description: 'Remote-controlled sports car – ages 5+ – 30 km/h' },
  { id: 'c2', name: 'Die-Cast Car Set (6pc)', nameLower: 'die cast car set', category: 'cars', price: 1200, img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop', description: 'Collectible metal toy cars – ages 3+ – multicolour' },
  { id: 't1', name: 'Giant Teddy Bear', nameLower: 'giant teddy bear', category: 'teddybears', price: 2800, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&h=300&fit=crop', description: 'Super soft 90 cm teddy – perfect gift – all ages' },
  { id: 't2', name: 'Mini Teddy Pack (3pc)', nameLower: 'mini teddy bear pack', category: 'teddybears', price: 900, img: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&h=300&fit=crop', description: 'Set of 3 colourful mini teddies – ages 2+' },
  { id: 'p1', name: '1000-Piece Jigsaw Puzzle', nameLower: '1000 piece jigsaw puzzle', category: 'puzzles', price: 950, img: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop', description: 'World map theme – challenging & educational – ages 10+' },
  { id: 'p2', name: 'Kids Puzzle (100 pcs)', nameLower: 'kids puzzle 100 piece', category: 'puzzles', price: 500, img: 'https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=400&h=300&fit=crop', description: 'Colourful animal theme – easy grip pieces – ages 4+' },
  { id: 'k1', name: 'Deluxe Kitchen Play Set', nameLower: 'deluxe kitchen play set', category: 'kitchen', price: 4200, img: '/images/3.png', description: '50+ pieces with sounds & lights – ages 3+ – pink' },
  { id: 'k2', name: 'Mini Cooking Set', nameLower: 'mini cooking set', category: 'kitchen', price: 1600, img: '/images/4.png', description: 'Includes pots, pans & food items – ages 3+' },
]

export default function Home() {
  const [searchParams] = useSearchParams()
  const { addToCart } = useCart()

  const [searchInput, setSearchInput] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('9999')
  const [sortFilter, setSortFilter] = useState('')

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setCatFilter(cat)
  }, [searchParams])

  const filtered = ALL_PRODUCTS
    .filter(p => {
      const q = searchInput.toLowerCase()
      const matchName = p.nameLower.includes(q)
      const matchCat = catFilter === '' || p.category === catFilter
      const matchPrice = p.price <= parseFloat(priceFilter)
      return matchName && matchCat && matchPrice
    })
    .sort((a, b) => {
      if (sortFilter === 'price-asc') return a.price - b.price
      if (sortFilter === 'price-desc') return b.price - a.price
      if (sortFilter === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  const categoryLabel: Record<string, string> = {
    dolls: 'Dolls', cars: 'Cars', teddybears: 'Teddy Bears', puzzles: 'Puzzles', kitchen: 'Kitchen'
  }

  return (
    <>
      <div className="page">
        <h1>🏪 Our Toys</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search toys…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <div className="select-container" style={{ flex: '0 0 180px' }}>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option value="dolls">Dolls</option>
              <option value="cars">Cars</option>
              <option value="teddybears">Teddy Bears</option>
              <option value="puzzles">Puzzles</option>
              <option value="kitchen">Kitchen Sets</option>
            </select>
          </div>
          <div className="select-container" style={{ flex: '0 0 180px' }}>
            <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
              <option value="9999">Any Price</option>
              <option value="1000">Under Rs 1,000</option>
              <option value="2000">Under Rs 2,000</option>
              <option value="3000">Under Rs 3,000</option>
              <option value="5000">Under Rs 5,000</option>
            </select>
          </div>
          <div className="select-container" style={{ flex: '0 0 160px' }}>
            <select value={sortFilter} onChange={e => setSortFilter(e.target.value)}>
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low→High</option>
              <option value="price-desc">Price: High→Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
          <button>🔍 Search</button>
        </div>

        <div className="card-container" id="product-grid">
          {filtered.map(product => (
            <div className="card product-card" key={product.id}>
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <h4>Rs {product.price.toLocaleString()}</h4>
              <span className="badge">{categoryLabel[product.category] || product.category}</span>
              <button onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
