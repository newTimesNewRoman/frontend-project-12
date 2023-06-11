import { Button, Form, Modal } from 'react-bootstrap';
import { object, string } from 'yup';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectors } from '../../slices';
import { useApi } from '../../contexts/Api';

const RenameChannel = ({ handleClose }) => {
  const input = useRef();
  const { renameChannel } = useApi();
  const channels = useSelector(selectors.channelsSelectors.getChannelNames);
  const { channelId } = useSelector(selectors.modalsSelectors.getExtra);
  const channel = useSelector(selectors.channelsSelectors.getCurrent);
  const { t } = useTranslation();

  const validationSchema = object({
    name: string()
      .trim()
      .required()
      .min(3, 'modals.validationChannelName')
      .max(20, 'modals.validationChannelName')
      .notOneOf(channels, 'modals.unique'),
  });

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      try {
        await renameChannel({ id: channelId, name });
        toast.success(t('channels.renamed'));
        handleClose();
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.default'));
        } else {
          toast.error(t('errors.network'));
        }

        input.current.select();
        throw error;
      }
    },
  });

  useEffect(() => {
    input.current.select();
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label={t('modals.close')}
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              className="mb-2"
              disabled={formik.isSubmitting}
              ref={input}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
