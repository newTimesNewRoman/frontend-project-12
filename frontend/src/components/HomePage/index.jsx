/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import {
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Channels from './Channels';
import Chat from './Chat';
import Modals from '../Modals';

import { actions } from '../../slices';
import { useAuth } from '../../hooks';

const HomePage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/v1/data', {
          headers: getAuthHeader(),
        });
        dispatch(actions.setInitialState(data));
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.default'));
        } else if (error.response.status === 401) {
          logout();
        } else {
          toast.error(t('errors.network'));
        }
        throw error;
      }

      setLoading(false);
    };

    fetchData();
  }, [dispatch, getAuthHeader, logout]);

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
