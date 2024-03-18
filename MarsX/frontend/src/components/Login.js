
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../apis/api';
import './Login.css'; 

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login: setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await login(credentials);
      console.log("I am SETTING THIS TOKEN: " + result.token + " in my context now");

      if (result.token) {
        setAuthToken(result.token);
        navigate('/', { state: { token: result.token } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="form-group">
        <label className="form-label">Username:</label>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password:</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="form-input"
        />
      </div>
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      <p>use username: ali: password: password</p>
    </div>
  );
};

export default Login;
