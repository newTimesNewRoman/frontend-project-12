/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState({ currentChannelId: null });

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: adapter.addOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = defaultChannelId;
      }

      adapter.removeOne(state, payload);
    },
    renameChannel: adapter.updateOne,
    setCurrentChannel: (state, { payload }) => {
      const { channelId } = payload;

      state.currentChannelId = channelId;
    },
    setInitialState: (state, { payload }) => {
      const { channels, currentChannelId } = payload;

      state.currentChannelId = currentChannelId;
      adapter.addMany(state, channels);
    },
  },
});

const { actions } = slice;
const selectors = adapter.getSelectors((state) => state.channels);
const channelsSelectors = {
  selectAll: selectors.selectAll,
  getCurrent: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectById(state, currentChannelId);
  },
  getCurrentId: (state) => state.channels.currentChannelId,
  getChannelNames: (state) => selectors.selectAll(state)
    .map((channel) => channel.name),
};

export { actions, defaultChannelId, channelsSelectors };

export default slice.reducer;
