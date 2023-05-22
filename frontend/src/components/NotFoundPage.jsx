import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">{t('notFound.message')}</p>
      <Link to="/">{t('notFound.linkText')}</Link>
    </div>
  );
};

export default NotFoundPage;
