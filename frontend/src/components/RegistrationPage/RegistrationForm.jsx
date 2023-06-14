/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { Button, Form } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useAuth } from '../../contexts/Auth';
import routes from '../../routes';
import api from '../../api';

const SignupForm = () => {
  const input = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [signupFailed, setSignupFailed] = useState(false);
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(3, 'registration.validationUsername')
      .max(20, 'registration.validationUsername'),
    password: yup
      .string()
      .required()
      .min(6, 'registration.validationPassword'),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'registration.validationMatch'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async ({ password, username }) => {
      setSignupFailed(false);

      try {
        const { data } = await axios.post(api.registration(), {
          password,
          username,
        });

        login(data);
        navigate(routes.homePage());
      } catch (error) {
        if (!error.name === 'AxiosError') {
          toast.error(t('errors.default'));
        } else if (error.response.status === 409) {
          setSignupFailed(true);
        } else {
          toast.error(t('errors.network'));
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
      <h1 className="text-center mb-4">{t('registration.title')}</h1>
      <Form.FloatingLabel
        className="mb-3"
        controlId="username"
        label={t('registration.username')}
      >
        <Form.Control
          name="username"
          autocomplete="username"
          placeholder={t('registration.username')}
          value={formik.values.username}
          isInvalid={
            (formik.errors.username && formik.touched.username)
            || signupFailed
          }
          onChange={formik.handleChange}
          ref={input}
          disabled={formik.isSubmitting}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {t(formik.errors.username)}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Form.FloatingLabel
        className="mb-3"
        controlId="password"
        label={t('registration.password')}
      >
        <Form.Control
          type="password"
          name="password"
          autocomplete="new-password"
          placeholder={t('registration.password')}
          value={formik.values.password}
          isInvalid={
            (formik.errors.password && formik.touched.password)
            || signupFailed
          }
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {t(formik.errors.password)}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Form.FloatingLabel
        className="mb-3"
        controlId="confirmPassword"
        label={t('registration.confirm')}
      >
        <Form.Control
          type="password"
          name="confirmPassword"
          autocomplete="new-password"
          placeholder={t('registration.confirm')}
          value={formik.values.confirmPassword}
          isInvalid={
            (formik.errors.confirmPassword
              && formik.touched.confirmPassword)
            || signupFailed
          }
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {signupFailed
            ? t('registration.exists')
            : t(formik.errors.confirmPassword)}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Button
        className="w-100 mb-3"
        variant="outline-primary"
        type="submit"
        disabled={formik.isSubmitting}
      >
        {t('registration.submit')}
      </Button>
    </Form>
  );
};

export default SignupForm;
