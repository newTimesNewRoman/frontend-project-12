import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './components/App';
import i18nextInstance from './i18next';

import reducer, { actions } from './slices';
import { ApiContext } from './contexts';

const init = async (socket) => {
  const withAcknowledgement = (event) => (args) => (
    new Promise((resolve, reject) => {
      socket.timeout(5000).volatile.emit(event, args, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.data);
        }
      });
    })
  );

  const api = {
    addChannel: withAcknowledgement('newChannel'),
    removeChannel: withAcknowledgement('removeChannel'),
    renameChannel: withAcknowledgement('renameChannel'),
    sendMessage: withAcknowledgement('newMessage'),
  };

  const store = configureStore({
    reducer,
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(actions.removeChannel(id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(actions.renameChannel({
      changes: { name },
      id,
    }));
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.NODE_ENV,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <ApiContext.Provider value={api}>
              <App />
            </ApiContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
