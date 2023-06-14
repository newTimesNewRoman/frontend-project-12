import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import notFoundImg from '../images/notFound.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt={t('notFound.title')} className="img-fluid h-25" src={notFoundImg} />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        <Link to={routes.homePage()}>{t('notFound.linkText')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
