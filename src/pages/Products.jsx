import React, { useMemo, useState } from 'react'
import productsData from '../data/products.json'
import ProductCard from '../components/ProductCard'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Products() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [category, setCategory] = useState('All')
  const [sortOption, setSortOption] = useState('') // 🔹 new state for sorting
  const navigate = useNavigate()

  const categories = useMemo(() => ['All', ...Array.from(new Set(productsData.map(p => p.category)))], [])

  // 🔹 Filtering logic
  const filtered = productsData.filter(p => {
    const qMatch =
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase())
    const catMatch = category === 'All' || p.category === category
    return qMatch && catMatch
  })

  // 🔹 Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price
    if (sortOption === 'price_desc') return b.price - a.price
    return 0 // Recommended (default)
  })

  return (
    <div style={{ marginTop: 18 }}>
      {/* 🔙 Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '8px 14px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: 16
        }}
      >
        ⬅ Back to Home
      </button>
      <button
          onClick={() => navigate('/orders')}
          style={{
            padding: '8px 14px',
            margin:'2px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🛒 My Orders
        </button>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <div className="card" style={{ padding: 10 }}>
          <label className="small">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ marginTop: 8, padding: 8 }}
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="card" style={{ padding: 10 }}>
          <label className="small">Sort</label>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)} // ✅ handle change
            style={{ marginTop: 8, padding: 8 }}
          >
            <option value="">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="products">
        {sorted.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div style={{ marginTop: 18 }} className="card">
          <p className="small">No products found.</p>
        </div>
      )}
    </div>
  )
}
