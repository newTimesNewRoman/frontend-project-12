/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable functional/no-expression-statements */
import {
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channels from './Channels';
import Chat from './Chat';
import Modals from '../Modals';

import { actions } from '../../slices';
import { useAuth } from '../../hooks';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAuthHeader, logout, username } = useAuth();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!username) {
      return navigate('/login');
    }

    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/v1/data', {
          headers: getAuthHeader(),
        });
        dispatch(actions.setInitialState(data));
      } catch (error) {
        console.log(t('errors.default'));
        throw error;
      }

      setLoading(false);
    };

    fetchData();
  }, [dispatch, getAuthHeader, logout, navigate, username]);

  return loading ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('home.loading')}</span>
      </Spinner>
    </div>
  ) : (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col
            className="border-end px-0 bg-light flex-column h-100 d-flex"
            xs="4"
            md="2"
          >
            <Channels />
          </Col>
          <Col className="p-0 h-100">
            <Chat />
          </Col>
        </Row>
      </Container>
      <Modals />
    </>
  );
};

export default HomePage;
