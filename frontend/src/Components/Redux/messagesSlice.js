/* eslint-disable functional/no-expression-statements */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем асинхронное действие для получения сообщений
export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (token) => {
  const response = await axios.get('/api/v1/data', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.messages;
});

// Создаем слайс для сообщений
const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => action.payload);
  },
});

export default messagesSlice.reducer;
