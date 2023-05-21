import {
  Card,
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';

import RegistrationForm from './RegistrationForm';

const RegistrationPage = () => (
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
                src="https://frontend-chat-ru.hexlet.app/static/media/avatar_1.6084447160acc893a24d.jpg"
                alt="img"
                roundedCircle
              />
            </Col>
            <RegistrationForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default RegistrationPage;
