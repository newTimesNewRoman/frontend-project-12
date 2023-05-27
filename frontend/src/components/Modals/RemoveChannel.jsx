/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks';

const RemoveChannel = ({ handleClose }) => {
  const { removeChannel } = useApi();
  const [loading, setLoading] = useState(false);
  const { channelId } = useSelector((state) => state.modals.extra);
  const { t } = useTranslation();

  const handleRemove = async () => {
    setLoading(true);

    try {
      await removeChannel({ id: channelId });
      toast.success(t('channels.removed'));
      handleClose();
    } catch (error) {
      if (!error.isAxiosError) {
        toast.error(t('errors.default'));
      } else {
        toast.error(t('errors.network'));
      }

      setLoading(false);
      throw error;
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label={t('modals.close')}
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={loading}
          >
            {t('modals.submit')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
