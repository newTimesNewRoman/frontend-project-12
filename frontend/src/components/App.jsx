import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { useAuth } from '../contexts/Auth';
import routes from '../routes';
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
    <Navigate to={routes.loginPage()} state={{ from: navigate }} />
  );
};

const UnAuthRoute = ({ children }) => {
  const { username } = useAuth();
  const navigate = useNavigate();
  if (username) {
    return (
      <Navigate to={routes.homePage()} state={{ from: navigate }} />
    );
  }
  return children;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Routes>
        <Route
          exact
          path={routes.homePage()}
          element={(<PrivateRoute><HomePage /></PrivateRoute>)}
        />
        <Route
          path={routes.loginPage()}
          element={<UnAuthRoute><LoginPage /></UnAuthRoute>}
        />
        <Route
          path={routes.registrationPage()}
          element={<UnAuthRoute><RegistrationPage /></UnAuthRoute>}
        />
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
