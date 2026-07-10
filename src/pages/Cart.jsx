import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/format'

export default function CartPage() {
  const { cart, updateQty, removeFromCart, total } = useCart()
  const navigate = useNavigate()

  return (
    <div style={{ marginTop: 18 }}>
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: 10,
          padding: '6px 12px',
          backgroundColor: '#eee',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        ← Back to Home
      </button>

      <h2>Your Cart</h2>

      <div
        className="card"
        style={{
          backgroundColor: '#fafafa',
          padding: 16,
          borderRadius: 8,
        }}
      >
        {/* --------- Empty Cart ---------- */}
        {cart.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p className="small">Your cart is empty.</p>
            <Link to="/products">
              <button className="button" style={{ marginTop: 10 }}>
                Shop now
              </button>
            </Link>
          </div>
        )}

        {/* --------- Cart with Items ---------- */}
        {cart.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 320px',
              gap: 16,
              alignItems: 'flex-start', // ✅ allows natural height
            }}
          >
            {/* -------- LEFT: CART ITEMS -------- */}
            <div className="cart-list">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="cart-item card"
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 12,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* --- Product Image --- */}
                  <div
                    style={{
                      width: 120,
                      height: 100,
                      backgroundColor: '#f5f5f5',
                      borderRadius: 8,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 8,
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.name}</div>
                        <div className="small">by {item.farmer}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700 }}>
                          {formatCurrency(item.price * item.qty)}
                        </div>
                        <div className="small">
                          {formatCurrency(item.price)} / {item.unit}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginTop: 8,
                      }}
                    >
                      <label className="small">Qty</label>
                      <input
                        type="number"
                        value={item.qty}
                        min={1}
                        onChange={(e) =>
                          updateQty(item.id, Math.max(1, Number(e.target.value || 1)))
                        }
                        style={{ width: 64, padding: 6 }}
                      />
                      <button onClick={() => removeFromCart(item.id)} className="small">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* -------- RIGHT: SUMMARY -------- */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content',
                position: 'sticky',
                top: 20,
              }}
            >
              <div
                className="card"
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  padding: 16,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <div>
                  <h3>Summary</h3>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <div className="small">Items</div>
                    <div className="small">{cart.length}</div>
                  </div>

                  {/* --- Add clearer breakdown --- */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <div className="small">Subtotal</div>
                    <div className="small">{formatCurrency(total)}</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <div className="small">Shipping</div>
                    <div className="small">Free</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <div className="small">Taxes</div>
                    <div className="small">₹0.00</div>
                  </div>

                  <hr style={{ margin: '10px 0' }} />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      marginTop: 8,
                    }}
                  >
                    <div>Total</div>
                    <div>{formatCurrency(total)}</div>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <button
                    className="button"
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: 16,
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
