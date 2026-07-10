import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/format'

export default function Checkout(){
  const { cart, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({name:'',phone:'',address:''})
  const [error, setError] = useState('')

  function onChange(e){
    setForm(f=>({...f,[e.target.name]: e.target.value}))
  }

  function placeOrder(){
    if(!form.name || !form.phone || !form.address){
      setError('Please fill all fields')
      return
    }

    // Build order object
    const order = {
      id: 'ORD' + Date.now(),
      date: new Date().toISOString(),            // ISO date for sorting
      customer: { name: form.name, phone: form.phone, address: form.address },
      items: cart.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        unit: i.unit,
        image: i.image,
        farmer: i.farmer
      })),
      subtotal: Number(total),
      shipping: 0,   // change if you calculate shipping
      tax: 0,
      total: Number(total) // subtotal + shipping + tax
    }

    // Read existing orders from localStorage (or empty array)
    const existing = JSON.parse(localStorage.getItem('orders') || '[]')
    // Add new order at start (most recent first)
    existing.unshift(order)
    localStorage.setItem('orders', JSON.stringify(existing))

    // clear cart and navigate to orders page
    clearCart()
    navigate('/success')
  }

  return (
    <div style={{marginTop:18}}>
      <h2>Checkout</h2>
      <div className="card" style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16}}>
        <div>
          <label className="small">Name</label>
          <input name="name" value={form.name} onChange={onChange} style={{width:'100%',padding:8,marginTop:6}} />

          <label className="small" style={{marginTop:12}}>Phone</label>
          <input name="phone" value={form.phone} onChange={onChange} style={{width:'100%',padding:8,marginTop:6}} />

          <label className="small" style={{marginTop:12}}>Address</label>
          <textarea name="address" value={form.address} onChange={onChange} style={{width:'100%',padding:8,marginTop:6}} rows={4} />

          {error && <div style={{color:'red',marginTop:8}}>{error}</div>}

          <div style={{marginTop:12}}>
            <button className="button" onClick={placeOrder}>Place Order</button>
          </div>
        </div>

        <div>
          <div className="card">
            <h3>Order Summary</h3>
            <div className="small">Items: {cart.length}</div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}><div className="small">Total</div><div style={{fontWeight:700}}>{formatCurrency(total)}</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
