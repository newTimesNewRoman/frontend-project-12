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

import registrationImg from '../../images/registration.jpg';
import RegistrationForm from './RegistrationForm';

const RegistrationPage = () => {
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
                <Image
                  src={registrationImg}
                  alt="img"
                  roundedCircle
                />
              </Col>
              <RegistrationForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('registration.haveAccount')}</span>
                {' '}
                <Link to={routes.loginPage()}>{t('registration.login')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
