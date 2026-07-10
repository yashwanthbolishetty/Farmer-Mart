import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function useCart(){
  return useContext(CartContext)
}

export function CartProvider({ children }){
  const [cart, setCart] = useState(() => {
    try{
      const raw = localStorage.getItem('fm_cart')
      return raw ? JSON.parse(raw) : []
    }catch(e){
      return []
    }
  })

  useEffect(()=>{
    localStorage.setItem('fm_cart', JSON.stringify(cart))
  },[cart])

  function addToCart(product, qty = 1){
    setCart(prev => {
      const found = prev.find(i => i.id === product.id)
      if(found){
        return prev.map(i => i.id===product.id?{...i, qty: i.qty + qty}:i)
      }
      return [...prev, {...product, qty}]
    })
  }

  function updateQty(id, qty){
    setCart(prev => prev.map(i => i.id===id?{...i, qty}:i))
  }

  function removeFromCart(id){
    setCart(prev => prev.filter(i => i.id!==id))
  }

  function clearCart(){
    setCart([])
  }

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0)

  const value = {cart, addToCart, updateQty, removeFromCart, clearCart, total}
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
