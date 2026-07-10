import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productsData from '../data/products.json'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/format'

export default function ProductDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const product = productsData.find(p => String(p.id) === String(id))
  const { addToCart } = useCart()

  if(!product) return <div className="card">Product not found</div>

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Back to products button */}
      <button
        onClick={() => navigate('/products')}
        className="button"
        style={{
          marginBottom: '20px',
          backgroundColor: '#f1f1f1',
          color: '#333',
          border: '1px solid #ccc',
        }}
      >
        ← Back to Products
      </button>

      <div
        className="card"
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
          padding: '20px',
        }}
      >
        {/* Product Image */}
        <div style={{ flex: '0 0 300px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '260px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* Product Details */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>{product.name}</h2>
          <p style={{ margin: '4px 0', color: '#555' }}>
            <strong>Category:</strong> {product.category}
          </p>
          <p style={{ margin: '4px 0', color: '#555' }}>
            <strong>Farmer:</strong> {product.farmer}
          </p>
          <p style={{ margin: '4px 0', color: '#555' }}>
            <strong>Unit:</strong> {product.unit}
          </p>
          <p style={{ margin: '8px 0', color: '#555' }}>
            <strong>Price:</strong> {formatCurrency(product.price)} / {product.unit}
          </p>

          <p style={{ marginTop: '12px', lineHeight: '1.5' }}>
            {product.description || 'Fresh, high-quality produce directly sourced from trusted local farmers. Sustainably grown and carefully harvested.'}
          </p>

          {/* Buttons */}
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button
              className="button"
              onClick={() => addToCart(product, 1)}
            >
              Add to Cart
            </button>

            <button
              className="button"
              style={{ backgroundColor: '#28a745' }}
              onClick={() => {
                addToCart(product, 1)
                navigate('/cart')
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
