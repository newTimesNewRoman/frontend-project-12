/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { Button, Form, InputGroup } from 'react-bootstrap';
import { object, string } from 'yup';
import { useEffect, useRef } from 'react';
import { animateScroll } from 'react-scroll';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import {
  selectCurrentChannel,
  selectCurrentChannelMessages,
} from '../../selectors';
import { useApi, useAuth } from '../../hooks';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {' '}
    {body}
  </div>
);

const Chat = () => {
  const input = useRef();
  const { username } = useAuth();
  const { sendMessage } = useApi();
  const channel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectCurrentChannelMessages);
  const validationSchema = object({
    body: string().trim().required(),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async ({ body }, { resetForm }) => {
      const message = {
        body,
        channelId: channel.id,
        username,
      };

      try {
        await sendMessage(message);

        resetForm();
      } catch (error) {
        if (!error.isAxiosError) {
          console.log('Неизвестная ошибка');
        } else {
          console.log('Ошибка сети');
        }

        throw error;
      }
    },
  });

  const isInvalid = !formik.dirty || !formik.isValid;

  useEffect(() => {
    input.current.focus();
    animateScroll.scrollToBottom({
      containerId: 'messages-box',
      delay: 0,
      duration: 0,
    });
  }, [channel, messages.length]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {channel?.name}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} messages`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages.map((message) => (
          <Message
            key={message.id}
            username={message.username}
            body={message.body}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form
          className="py-1 border rounded-2"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <InputGroup hasValidation={isInvalid}>
            <Form.Control
              ref={input}
              name="body"
              aria-label="Новое сообщение"
              value={formik.values.body}
              className="border-0 p-0 ps-2"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              placeholder="Введите сообщение"
            />
            <Button
              className="border-0"
              variant="group-vertical"
              type="submit"
              disabled={isInvalid || formik.isSubmitting}
            >
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
