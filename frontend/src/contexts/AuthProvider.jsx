import { useMemo, useState } from 'react';
import { AuthContext } from './index';

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [username, setUsername] = useState(userData?.username ?? null);

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? { Authorization: `Bearer ${user.token}` } : {};
  };

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
  }), [username]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
