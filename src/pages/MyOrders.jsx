import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/format'

export default function MyOrders() {
  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem('orders') || '[]')
  )
  const [timeLeft, setTimeLeft] = useState(null)
  const navigate = useNavigate()

  // ✅ Function to remove a specific order
  const handleRemoveOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id)
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))

    // If all orders are removed, clear timestamp too
    if (updatedOrders.length === 0) {
      localStorage.removeItem('orderTimestamp')
    }
  }

  if (!orders || orders.length === 0) {
    return (
      <div style={{ marginTop: 18 }}>
        <h2>My Orders</h2>
        <div className="card" style={{ padding: 24, textAlign: 'center' }}>
          <p className="small">You have no orders yet.</p>
          <Link to="/products">
            <button className="button">Shop Now</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginTop: 18 }}>
      {/* 🔙 Navigation Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 14px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ⬅ Back to Home
        </button>

        <button
          onClick={() => navigate('/products')}
          style={{
            padding: '8px 14px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🛍 Back to Products
        </button>
      </div>

      <h2>My Orders</h2>

      {timeLeft && (
        <p className="small" style={{ marginBottom: 12, color: 'gray' }}>
          Your orders will clear automatically in <b>{timeLeft}s</b>
        </p>
      )}

      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ padding: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>Order {order.id}</div>
                <div className="small">
                  Placed: {new Date(order.date).toLocaleString()}
                </div>
                <div className="small">Customer: {order.customer?.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>
                  {formatCurrency(order.total)}
                </div>
                <div className="small">Status: {order.status || 'Placed'}</div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 80px',
                  gap: 8,
                  alignItems: 'center'
                }}
              >
                {order.items.map((it) => (
                  <React.Fragment key={it.id}>
                    <div>
                      <img
                        src={it.image}
                        alt={it.name}
                        style={{
                          width: 56,
                          height: 44,
                          objectFit: 'cover',
                          borderRadius: 6
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{it.name}</div>
                      <div className="small">
                        {it.qty} × {formatCurrency(it.price)} / {it.unit}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontWeight: 700 }}>
                      {formatCurrency(it.price * it.qty)}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* ✅ Remove Order Button */}
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <button
                className="button"
                style={{
                  backgroundColor: '#f44336',
                  border: 'none',
                  padding: '6px 12px',
                  color: 'white',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
                onClick={() => handleRemoveOrder(order.id)}
              >
                Remove Order History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
