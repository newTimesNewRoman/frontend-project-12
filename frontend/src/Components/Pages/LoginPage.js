import React from 'react';
import LoginForm from '../Forms/LoginForm';

const LoginPage = () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">MyChat</a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div
                  className="col-6 col-md-6 d-flex align-items-center justify-content-center"
                >
                  <img
                    src="https://i.pinimg.com/236x/12/73/a5/1273a59a0ef637f25537e230d6f41e72.jpg"
                    className="rounded-circle"
                    alt="Войти"
                  />
                </div>
                <LoginForm />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  {' '}
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="Toastify" />
  </div>
);

export default LoginPage;
