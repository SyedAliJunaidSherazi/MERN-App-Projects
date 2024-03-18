import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    console.log("In my context, got the token value right now:", newToken);
    setToken(newToken);
  };

  const logout = () => {
    console.log("Logging out, setting token to null");
    setToken(null);
  };

  console.log("Rendering AuthProvider with token:", token);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  console.log("useAuth hook called");

  const authContext = useContext(AuthContext);
  console.log("Context values in useAuth:", authContext);

  return authContext;
};
