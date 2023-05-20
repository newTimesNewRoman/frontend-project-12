/* eslint-disable functional/no-expression-statements */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем асинхронное действие для получения каналов
export const fetchChannels = createAsyncThunk('channels/fetchChannels', async (token) => {
  const response = await axios.get('/api/v1/data', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.channels;
});

// Создаем слайс для каналов
const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => action.payload);
  },
});

export default channelsSlice.reducer;
