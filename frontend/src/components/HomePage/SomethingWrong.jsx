/* eslint-disable functional/no-expression-statements */
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import routes from '../../routes';

const handleUpdate = (navigate) => () => {
  navigate(routes.homePage());
};

const SomethingWrong = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <p className="p-2 fst-italic">{t('errors.default')}</p>
      <Button className="p-2" onClick={handleUpdate(navigate)}>{t('home.refresh')}</Button>
    </div>
  );
};

export default SomethingWrong;
