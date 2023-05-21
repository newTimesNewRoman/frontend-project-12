/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { useApi } from '../../hooks';

const RemoveChannel = ({ handleClose }) => {
  const { removeChannel } = useApi();
  const [loading, setLoading] = useState(false);
  const { channelId } = useSelector((state) => state.modals.extra);

  const handleRemove = async () => {
    setLoading(true);

    try {
      await removeChannel({ id: channelId });

      handleClose();
    } catch (error) {
      if (!error.isAxiosError) {
        console.log('Неизвестная ошибка');
      } else {
        console.log('Ошибка сети');
      }

      setLoading(false);
      throw error;
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Удалить</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Закрыть"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Подтвердите удаление</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            Закрыть
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={loading}
          >
            Подтвердить
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
