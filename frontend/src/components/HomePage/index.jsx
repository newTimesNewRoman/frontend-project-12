/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import {
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Channels from './Channels';
import Chat from './Chat';
import Modals from '../Modals';
import SomethingWrong from './SomethingWrong';

import { selectors } from '../../slices';
import { fetchData } from '../../slices/channels';
import { useAuth } from '../../contexts/Auth';

const HomePage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader, logout } = useAuth();
  const { t } = useTranslation();

  const loading = useSelector(selectors.channelsSelectors.isLoading);
  const hasError = useSelector(selectors.channelsSelectors.hasError);

  useEffect(() => {
    const authHeader = getAuthHeader();
    dispatch(fetchData(authHeader))
      .unwrap()
      .catch((error) => {
        if (!error.isAxiosError) {
          toast.error(t('errors.default'));
        } else if (error.response.status === 401) {
          logout();
        } else {
          toast.error(t('errors.network'));
        }
      });
  }, [dispatch, getAuthHeader, logout]);

  if (hasError) {
    return (
      <SomethingWrong />
    );
  }

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
