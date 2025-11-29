import { editChannel } from '../slices/channels.js'
import socket from '../socket.js'
import store from '../slices/index.js'

const renameChannelSubscribe = () => {
  // subscribe rename channel
  socket.on('renameChannel', (payload) => {
    store.dispatch(editChannel({ id: payload.id, newName: payload.name })); // { id: 7, name: "new name channel", removable: true }
  });
}

export default renameChannelSubscribe