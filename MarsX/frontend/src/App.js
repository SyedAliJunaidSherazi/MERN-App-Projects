import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import IngestData from './components/IngestData';
import GetData from './components/GetData';
import Home from './components/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/ingest" element={<IngestData />} />
          <Route path="/data" element={<GetData />} />
         
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
