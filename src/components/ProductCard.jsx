import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/format'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="product-card card">
      <img src={product.image} alt={product.name} />
      <div>
        <h4 style={{ margin: 0 }}>{product.name}</h4>
        <div className="small">
          {product.category} • by {product.farmer}
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <div style={{ fontWeight: 700 }}>
            {formatCurrency(product.price)} / {product.unit}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/product/${product.id}`} className="small">
              Details
            </Link>
            <button className="button" onClick={() => addToCart(product, 1)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
