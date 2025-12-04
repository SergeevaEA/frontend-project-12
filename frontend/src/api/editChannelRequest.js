import { apiRoutes } from './apiRoutes'
import instance from './instance'

const editChannel = async (id, newChannelName) => {
  // Example: editChannel = { name: 'new name channel' }
  const channel = { name: newChannelName }
  const path = apiRoutes.editChannelRequest(id)
  const response = await instance.patch(path, channel)
  return response.data // => { id: '3', name: 'new name channel', removable: true }
}

export default editChannel
