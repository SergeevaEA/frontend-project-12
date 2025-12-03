/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from './user.js';

const initialState = {
  entities: {
    1: { id: '1', name: 'general', removable: false },
    2: { id: '2', name: 'random', removable: false },
  },
  ids: ['1', '2'],
  currentChannelId: '1', // так как с сервера приходят данные [{ id: '1', name: 'general', removable: false }, ...]
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      const channels = action.payload;
      state.entities = {};
      channels.forEach((ch) => {
        state.entities[ch.id] = ch;
      });
      state.ids = channels.map((ch) => ch.id);
    },
    postNewChannel: (state, action) => {
      const newChannel = action.payload;
      state.entities[newChannel.id] = newChannel;
      state.ids.push(newChannel.id);
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    removeChannel: (state, action) => {
      const idToDelete = action.payload;
      delete state.entities[idToDelete];
      state.ids = state.ids.filter((id) => id !== idToDelete);

      state.currentChannelId = '1';
    },
    editChannel: (state, action) => {
      const { id, newName } = action.payload;
      state.entities[id].name = newName;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.entities = { 1: { id: '1', name: 'general', removable: false }, 2: { id: '2', name: 'random', removable: false } };
      state.ids = ['1', '2'];
      state.currentChannelId = '1';
    });
  },
});

export const {
  setChannels, postNewChannel, setCurrentChannelId, removeChannel, editChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
