/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { Button, Form } from 'react-bootstrap';
import { object, string } from 'yup';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

const LoginForm = () => {
  const input = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);

  const validationSchema = object({
    password: string().trim().required(),
    username: string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsInvalid(false);

      try {
        const { data } = await axios.post('/api/v1/login', values);
        login(data);
        navigate('/');
      } catch (error) {
        if (!error.isAxiosError) {
          console.log('Неизвестная ошибка');
        } else if (error.response.status === 401) {
          setIsInvalid(true);
        } else {
          console.log('Ошибка сети');
        }

        input.current.select();
        throw error;
      }
    },
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.FloatingLabel
        className="mb-3"
        controlId="username"
        label="Логин"
      >
        <Form.Control
          name="username"
          autocomplete="username"
          placeholder="Логин"
          value={formik.values.username}
          isInvalid={isInvalid}
          onChange={formik.handleChange}
          ref={input}
          disabled={formik.isSubmitting}
          required
        />
      </Form.FloatingLabel>
      <Form.FloatingLabel
        className="mb-3"
        controlId="password"
        label="Пароль"
      >
        <Form.Control
          name="password"
          autocomplete="current-password"
          placeholder="Пароль"
          type="password"
          value={formik.values.password}
          isInvalid={isInvalid}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          required
        />
        {isInvalid && (
          <Form.Control.Feedback type="invalid" tooltip>
            login.auth
          </Form.Control.Feedback>
        )}
      </Form.FloatingLabel>
      <Button
        className="w-100 mb-3"
        variant="outline-primary"
        type="submit"
        disabled={formik.isSubmitting}
      >
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
