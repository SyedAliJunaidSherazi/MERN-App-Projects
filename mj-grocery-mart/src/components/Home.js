import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      alert(`Searching for: ${searchTerm}`);
    } else {
      alert('Please enter a search term');
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="logo">
          <i className="fas fa-shopping-cart"></i>
          <h1>Online Shopping Store</h1>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <nav className="links">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </header>
      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to the Online Shopping Store!</h1>
            <p>Explore our wide range of grocery items and start shopping.</p>
          </div>
        </section>
        <section className="blogs">
          <h2>Latest Blogs</h2>
          <div className="blog-list">
            <div className="blog-item">
              <h3>Blog Title 1</h3>
              <p>Blog content goes here...</p>
            </div>
            <div className="blog-item">
              <h3>Blog Title 2</h3>
              <p>Blog content goes here...</p>
            </div>
            <div className="blog-item">
              <h3>Blog Title 3</h3>
              <p>Blog content goes here...</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 Online Shopping Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
