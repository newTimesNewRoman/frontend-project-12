import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { useAuth } from '../contexts/Auth';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import RegistrationPage from './RegistrationPage';

const PrivateRoute = ({ children }) => {
  const { username } = useAuth();
  const navigate = useNavigate();
  if (username) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ from: navigate }} />
  );
};

const UnAuthRoute = ({ children }) => {
  const { username } = useAuth();
  const navigate = useNavigate();
  if (username) {
    return (
      <Navigate to="/" state={{ from: navigate }} />
    );
  }
  return children;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={(<PrivateRoute><HomePage /></PrivateRoute>)} />
        <Route path="/login" element={<UnAuthRoute><LoginPage /></UnAuthRoute>} />
        <Route path="/signup" element={<UnAuthRoute><RegistrationPage /></UnAuthRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    <ToastContainer
      position="top-right"
      transition={Slide}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);

export default App;
