/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modals',
  initialState: {
    extra: null,
    isOpened: false,
    type: null,
  },
  reducers: {
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
    openModal: (state, { payload }) => {
      const { type, extra } = payload;

      state.isOpened = true;
      state.type = type;
      state.extra = extra ?? null;
    },
  },
});

export const modalsSelectors = {
  getState: (state) => state.modals,
  isOpened: (state) => state.modals.isOpened,
  getType: (state) => state.modals.type,
  getExtra: (state) => state.modals.extra,
};

export const { actions } = slice;

export default slice.reducer;
