import { postMessage } from '../slices/messages.js';
import socket from '../socket.js';
import store from '../slices/index.js';

const newMessagesSubscribe = () => {
  // subscribe new messages
  socket.on('newMessage', (payload) => {
    store.dispatch(postMessage(payload)); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });
};

export default newMessagesSubscribe;
