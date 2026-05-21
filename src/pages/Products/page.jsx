import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';

const ALL_PRODUCTS = [
  { id: 'd1', name: 'Barbie Fashion Doll',     category: 'dolls',      price: 2400, img: img2, desc: 'Classic Barbie with stylish outfits – ages 3+',             badge: 'Dolls'       },
  { id: 'd2', name: 'Baby Doll Set',            category: 'dolls',      price: 1800, img: img1, desc: 'Soft & cuddly baby doll with accessories – ages 2+',        badge: 'Dolls'       },
  { id: 'c1', name: 'RC Racing Car',            category: 'cars',       price: 3100, img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop', desc: 'Remote-controlled sports car – ages 5+ – 30 km/h', badge: 'Cars' },
  { id: 'c2', name: 'Die-Cast Car Set (6pc)',   category: 'cars',       price: 1200, img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop', desc: 'Collectible metal toy cars – ages 3+ – multicolour', badge: 'Cars' },
  { id: 't1', name: 'Giant Teddy Bear',         category: 'teddybears', price: 2800, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&h=300&fit=crop', desc: 'Super soft 90 cm teddy – perfect gift – all ages', badge: 'Teddy Bears' },
  { id: 't2', name: 'Mini Teddy Pack (3pc)',    category: 'teddybears', price: 900,  img: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&h=300&fit=crop', desc: 'Set of 3 colourful mini teddies – ages 2+', badge: 'Teddy Bears' },
  { id: 'p1', name: '1000-Piece Jigsaw Puzzle', category: 'puzzles',    price: 950,  img: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop', desc: 'World map theme – challenging & educational – ages 10+', badge: 'Puzzles' },
  { id: 'p2', name: 'Kids Puzzle (100 pcs)',    category: 'puzzles',    price: 500,  img: 'https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=400&h=300&fit=crop', desc: 'Colourful animal theme – easy grip pieces – ages 4+', badge: 'Puzzles' },
  { id: 'k1', name: 'Deluxe Kitchen Play Set',  category: 'kitchen',    price: 4200, img: img3, desc: '50+ pieces with sounds & lights – ages 3+ – pink',          badge: 'Kitchen'     },
  { id: 'k2', name: 'Mini Cooking Set',         category: 'kitchen',    price: 1600, img: img4, desc: 'Includes pots, pans & food items – ages 3+',                badge: 'Kitchen'     },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceMax, setPriceMax] = useState(9999);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filtered = ALL_PRODUCTS
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = !category || p.category === category;
      const matchPrice = p.price <= priceMax;
      return matchSearch && matchCat && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="page">
      <h1>🏪 Our Toys</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search toys…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="select-container" style={{ flex: '0 0 180px' }}>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="dolls">Dolls</option>
            <option value="cars">Cars</option>
            <option value="teddybears">Teddy Bears</option>
            <option value="puzzles">Puzzles</option>
            <option value="kitchen">Kitchen Sets</option>
          </select>
        </div>
        <div className="select-container" style={{ flex: '0 0 180px' }}>
          <select value={priceMax} onChange={e => setPriceMax(Number(e.target.value))}>
            <option value={9999}>Any Price</option>
            <option value={1000}>Under Rs 1,000</option>
            <option value={2000}>Under Rs 2,000</option>
            <option value={3000}>Under Rs 3,000</option>
            <option value={5000}>Under Rs 5,000</option>
          </select>
        </div>
        <div className="select-container" style={{ flex: '0 0 160px' }}>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low→High</option>
            <option value="price-desc">Price: High→Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
        <button onClick={() => {}}>🔍 Search</button>
      </div>

      <div className="card-container">
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted-color)', padding: '40px' }}>No products found.</p>
        ) : (
          filtered.map(product => (
            <div key={product.id} className="card product-card">
              <img
                src={product.img}
                alt={product.name}
                onError={e => { e.target.src = 'https://via.placeholder.com/240x180?text=Toy'; }}
              />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <h4>Rs {product.price.toLocaleString()}</h4>
              <span className="badge">{product.badge}</span>
              <button
                style={{ marginTop: '10px' }}
                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
