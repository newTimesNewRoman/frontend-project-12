/* eslint-disable no-param-reassign */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const defaultChannelId = 1;

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState({ currentChannelId: null });

export const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (authHeader) => {
    const { data } = await axios.get('/api/v1/data', {
      headers: authHeader,
    });
    return data;
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        const { channels, currentChannelId } = action.payload;
        state.currentChannelId = currentChannelId;
        adapter.addMany(state, channels);
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      });
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
