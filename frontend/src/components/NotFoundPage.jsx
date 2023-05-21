import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">404 Not Found</h1>
    <p className="text-muted">Извините, указанная страница не найдена.</p>
    <Link to="/">Вернуться на главную</Link>
  </div>
);

export default NotFoundPage;
