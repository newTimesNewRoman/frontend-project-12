import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './Components/Redux/messagesSlice';
import channelsReducer from './Components/Redux/channelsSlice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
  },
});

export default store;
