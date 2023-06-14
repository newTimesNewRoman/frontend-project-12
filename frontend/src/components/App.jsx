import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { useAuth } from '../contexts/Auth';
import routes from '../routes';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import RegistrationPage from './RegistrationPage';

const RouteGuard = ({ children, requireAuth }) => {
  const { username } = useAuth();
  const navigate = useNavigate();

  if (requireAuth && !username) {
    return <Navigate to={routes.loginPage()} state={{ from: navigate }} />;
  }

  if (!requireAuth && username) {
    return <Navigate to={routes.homePage()} state={{ from: navigate }} />;
  }

  return children;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route
            exact
            path={routes.homePage()}
            element={<RouteGuard requireAuth><HomePage /></RouteGuard>}
          />
          <Route
            path={routes.loginPage()}
            element={<RouteGuard><LoginPage /></RouteGuard>}
          />
          <Route
            path={routes.registrationPage()}
            element={<RouteGuard><RegistrationPage /></RouteGuard>}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
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
