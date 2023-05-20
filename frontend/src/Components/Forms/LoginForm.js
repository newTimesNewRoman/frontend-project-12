/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Container, Form as BootstrapForm, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      const status = error.response?.status;
      if (status === 401) {
        setFieldError('password', 'Ошибка авторизации');
      } else {
        setFieldError('password', 'Что-то пошло не так');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Введите имя пользователя'),
    password: Yup.string().required('Введите пароль'),
  });

  return (
    <Container className="col-6">
      <h1>Авторизация</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form as={BootstrapForm}>
            <BootstrapForm.Group controlId="username">
              <BootstrapForm.Label>Имя пользователя</BootstrapForm.Label>
              <Field type="text" name="username" as={BootstrapForm.Control} />
              <ErrorMessage name="username" component={BootstrapForm.Text} className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="password">
              <BootstrapForm.Label>Пароль</BootstrapForm.Label>
              <Field type="password" name="password" as={BootstrapForm.Control} />
              <ErrorMessage name="password" component={BootstrapForm.Text} className="text-danger" />
            </BootstrapForm.Group>

            <Button type="submit" disabled={isSubmitting}>
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
