import { apiRoutes } from './apiRoutes'
import instance from './instance'

const removeChannelRequest = async (id) => {
  const path = apiRoutes.removeChannelRequest(id)
  const response = await instance.delete(path)
  return response.data // => { id: '3' }
}

export default removeChannelRequest
