/* eslint-disable functional/no-expression-statements */
import {
  useMemo, useState, createContext, useContext, useCallback,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [username, setUsername] = useState(userData?.username ?? null);
  const userToken = userData?.token || null;

  const getAuthHeader = useCallback(() => (userToken ? { Authorization: `Bearer ${userToken}` } : {}), [userToken]);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUsername(user.username);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUsername(null);
  };

  const values = useMemo(() => ({
    getAuthHeader,
    login,
    logout,
    username,
  }), [getAuthHeader, username]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
