// Update the existing code in your Home.js file

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IngestData from '../components/IngestData';
import GetData from '../components/GetData';
import Dropdown from 'react-bootstrap/Dropdown';
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const token = state && state.token;

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <header>
        <h1>MarsX</h1>
        <nav>
          <Dropdown>
            <Dropdown.Item onClick={handleLoginClick}>Login</Dropdown.Item>
            
          </Dropdown>
        </nav>
      </header>
      <main>
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
         
          <IngestData token={token} />
        </div>
        
        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
          
          <GetData />
        </div>
      </main>
    </div>
  );
};

export default Home;
