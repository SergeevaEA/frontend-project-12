import { postNewChannel, setCurrentChannelId } from '../slices/channels.js'
import socket from '../socket.js'
import store from '../slices/index.js'

const newChannelSubscribe = () => {
  // subscribe new channel
  socket.on('newChannel', (payload) => {  // получили от сервера: { id: 6, name: "new channel", removable: true }
    store.dispatch(postNewChannel(payload))
    store.dispatch(setCurrentChannelId(payload.id))
  });
}

export default newChannelSubscribe

