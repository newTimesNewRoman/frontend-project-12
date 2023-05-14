import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h2>404 Not Found</h2>
    <p>Извините, указанная страница не найдена.</p>
    <Link to="/">Вернуться на главную</Link>
  </div>
);

export default NotFoundPage;
