import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
  ]);

  const addToCart = (item) => {
    alert(`Added ${item.name} to cart`);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <h1>Online Shopping Store</h1>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>
      <h1>Products</h1>
      {items.map((item) => (
        <div key={item.id} className="item">
          <p>{item.name}</p>
          <p>${item.price}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
