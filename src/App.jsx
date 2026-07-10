import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import { useCart } from './context/CartContext'
import MyOrders from './pages/MyOrders'


export default function App(){
  const { cart } = useCart()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    if(q) params.set('q', q)
    else params.delete('q')
    if(location.pathname.startsWith('/products')){
      navigate({ pathname: '/products', search: params.toString() }, { replace: true })
    }
    // eslint-disable-next-line
  },[q])

  function onSearchChange(e){
    setQ(e.target.value)
  }

  return (
    <div>
      <header className="header">
        <div className="container" style={{display:'flex',alignItems:'center'}}>
          <div className="logo">
            <img src="https://img.icons8.com/color/48/000000/farmer.png" alt="logo" style={{height:36}}/>
            <h1>FarmerMart</h1>
          </div>

          <div className="search" style={{maxWidth:600}}>
            <input value={q} onChange={onSearchChange} placeholder="Search products or categories..." />
          </div>

          <div className="nav-actions">
            <Link to="/products"><button className="button">Shop</button></Link>
            <Link to="/cart"><button className="button">Cart ({cart.length})</button></Link>
          </div>
        </div>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <footer className="footer">
          <p>Built with ❤️ for farmers & customers.</p>
        </footer>
      </div>
    </div>
  )
}
