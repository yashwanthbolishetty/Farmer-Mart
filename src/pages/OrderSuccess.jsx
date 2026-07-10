import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function OrderSuccess() {
  const { cart, total, clearCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (cart.length === 0) return

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total,
      status: 'Placed',
      customer: { name: 'John Doe' } // Replace later with actual form data
    }

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    existingOrders.push(newOrder)

    // ✅ Save new order and timestamp
    localStorage.setItem('orders', JSON.stringify(existingOrders))
    localStorage.setItem('orderTimestamp', Date.now().toString())

    // ✅ Clear cart after placing order
    clearCart()
  }, [cart, total, clearCart])

  return (
    <div style={{ textAlign: 'center', marginTop: 60 }}>
      <h2>🎉 Order Placed Successfully!</h2>
      <p style={{ marginTop: 10 }}>Thank you for your purchase!</p>

      <div style={{ marginTop: 30 }}>
        <button
          onClick={() => navigate('/orders')}
          style={{
            padding: '10px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          👀 See Your Orders
        </button>

        <button
          onClick={() => navigate('/')}
          style={{
            marginLeft: 12,
            padding: '10px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  )
}
