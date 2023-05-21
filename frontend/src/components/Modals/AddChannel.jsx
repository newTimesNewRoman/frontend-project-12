/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { Button, Form, Modal } from 'react-bootstrap';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import { actions } from '../../slices';
import { selectChannelsNames } from '../../selectors';
import { useApi } from '../../hooks';

const AddChannel = ({ handleClose }) => {
  const input = useRef();
  const dispatch = useDispatch();
  const { addChannel } = useApi();
  const channels = useSelector(selectChannelsNames);

  const validationSchema = object({
    name: string()
      .trim()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channels),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      try {
        const { id } = await addChannel({ name });

        dispatch(actions.setCurrentChannel({ channelId: id }));
        handleClose();
      } catch (error) {
        if (!error.isAxiosError) {
          console.log('Неизвестная ошибка');
        } else {
          console.log('Ошибка сети');
        }

        input.current.select();
        throw error;
      }
    },
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>Добавить</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Закрыть"
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
            <Form.Label visuallyHidden>Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              Имя недоступно
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                Отменить
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Создать
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannel;
