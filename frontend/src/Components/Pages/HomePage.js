/* eslint-disable consistent-return */
/* eslint-disable functional/no-expression-statements */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }
  }, [navigate]);

  return <h1>Home Page!</h1>;
};

export default HomePage;
