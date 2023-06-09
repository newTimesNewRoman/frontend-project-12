import { Navbar as NavBar, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/Auth';
import routes from '../routes';

const Navbar = () => {
  const { logout, username } = useAuth();
  const { t } = useTranslation();

  return (
    <NavBar className="shadow-sm" bg="white" expand="lg">
      <Container>
        <NavBar.Brand as={Link} to={routes.homePage()}>
          {t('navbar.title')}
        </NavBar.Brand>
        {username && (
          <Button variant="primary" type="button" onClick={logout}>
            {t('navbar.logout')}
          </Button>
        )}
      </Container>
    </NavBar>
  );
};

export default Navbar;
