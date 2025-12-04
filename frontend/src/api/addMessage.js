import { apiRoutes } from './apiRoutes'
import instance from './instance'

const addMessage = async (newMessage) => {
  // Example: newMessage = { body: 'new message', channelId: '1', username: 'admin' }
  const response = await instance.post(apiRoutes.addMessage, newMessage)
  return response.data // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
}

export default addMessage
