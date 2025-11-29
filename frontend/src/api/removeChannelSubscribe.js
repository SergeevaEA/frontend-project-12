import { removeChannel } from '../slices/channels.js'
import socket from '../socket.js'
import store from '../slices/index.js'

const removeChannelSubscribe = () => {
  // subscribe remove channel
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id)); // { id: 6 };
  });
}

export default removeChannelSubscribe