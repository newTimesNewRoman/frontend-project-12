import { Navbar as NavBar, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

const Navbar = () => {
  const { logout, username } = useAuth();
  const { t } = useTranslation();

  return (
    <NavBar className="shadow-sm" bg="white" expand="lg">
      <Container>
        <NavBar.Brand as={Link} to="/">
          {t('title')}
        </NavBar.Brand>
        {username && (
          <Button variant="primary" type="button" onClick={logout}>
            Выйти
          </Button>
        )}
      </Container>
    </NavBar>
  );
};

export default Navbar;
