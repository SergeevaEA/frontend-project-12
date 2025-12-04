import { apiRoutes } from './apiRoutes'
import instance from './instance'

const addChannel = async (newChannel) => {
  // Example: newChannel = { name: 'new channel' }
  const response = await instance.post(apiRoutes.addChannel, newChannel)
  return response.data // => { id: '3', name: 'new channel', removable: true }
}

export default addChannel
