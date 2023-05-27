/* eslint-disable functional/no-expression-statements */
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import RegistrationPage from './RegistrationPage';

import { AuthContext } from '../contexts';

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

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
