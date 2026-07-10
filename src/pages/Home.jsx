import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🌿 Welcome to FarmerMart</h1>
        <p>Healthy food starts with healthy farms — support your local farmers!</p>
        <div className="home-buttons">
          <Link to="/products"><button className="button">Start Shopping</button></Link>
          <Link to="/orders"><button className="button dark">My Orders</button></Link>
        </div>
      </header>

      <section className="image-grid">
        <div className="image-card">
          <img src="https://cdn.shopify.com/s/files/1/0445/1365/6985/files/how-to-choose-fresh-veggies.jpg?v=1638206855" alt="Fresh Vegetables" />
          <p>🥕 Fresh from the farm to your kitchen</p>
        </div>
        <div className="image-card">
          <img src="https://previews.123rf.com/images/manojchoughulephotography/manojchoughulephotography2005/manojchoughulephotography200500004/148469216-farmers-working-hard-in-farm.jpg" alt="Farmer working" />
          <p>👨‍🌾 Supporting our hardworking farmers</p>
        </div>
        <div className="image-card">
          <img src="https://static.toiimg.com/thumb/msid-76850772,width-1280,height-720,resizemode-4/76850772.jpg" alt="Organic produce" />
          <p>🍅 100% Organic and locally grown</p>
        </div>
        <div className="image-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3u4NM5rxN9h6Rl2sfYDm4UbZ7vGbjlVVVjQ&s" alt="Healthy basket" />
          <p>🥦 Eat clean. Live green.</p>
        </div>
        <div className="image-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZNy3zvYq7zME9lT5duAW6gRmpNtbjwO9rQ&s" alt="Healthy Salad" />
          <p>🌽 Fresh ingredients for a healthier you</p>
        </div>
      </section>
    </div>
  )
}
