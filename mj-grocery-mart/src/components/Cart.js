import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (item) => {
    alert(`Removed ${item.name} from cart`);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <h1>Online Shopping Store</h1>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <p>{item.name}</p>
              <p>${item.price}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
