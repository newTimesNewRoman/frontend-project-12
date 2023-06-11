import {
  Card,
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';

import loginImg from '../../images/login.jpg';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                className="d-flex align-items-center justify-content-center"
                xs="12"
                md="6"
              >
                <Image src={loginImg} alt="img" roundedCircle />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                {' '}
                <Link to={routes.registrationPage()}>{t('login.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
