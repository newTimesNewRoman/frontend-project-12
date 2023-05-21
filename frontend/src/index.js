/* eslint-disable functional/no-expression-statements */
import { createRoot } from 'react-dom';
import { io } from 'socket.io-client';
import { StrictMode } from 'react';

import init from './init';

import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  const root = createRoot(document.getElementById('root'));
  const socket = io();
  const vdom = await init(socket);

  root.render(<StrictMode>{vdom}</StrictMode>);
};

app();
