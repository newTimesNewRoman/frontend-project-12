import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions, fetchData } from './channels.js';

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: adapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const restMessages = Object.values(state.entities).filter(
          ({ channelId }) => channelId !== payload,
        );

        adapter.setAll(state, restMessages);
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload.messages);
      });
  },
});

const { actions } = slice;
const selectors = adapter.getSelectors((state) => state.messages);
const messagesSelectors = {
  getAll: selectors.selectAll,
  getCurrent: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectAll(state)
      .filter(({ channelId }) => channelId === currentChannelId);
  },
};

export { actions, messagesSelectors };

export default slice.reducer;
