/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const LoginForm = () => (
  <div>
    <h1>Авторизация</h1>
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, 'Не более 15 символов')
          .required('Обязательное поле'),
        password: Yup.string()
          .min(8, 'Не менее 8 символов')
          .required('Обязательное поле'),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="username">Имя пользователя</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" />

          <label htmlFor="password">Пароль</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" />

          <button type="submit" disabled={isSubmitting}>
            Войти
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginForm;
