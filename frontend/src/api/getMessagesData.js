import { apiRoutes } from './apiRoutes'
import instance from './instance'

const getMessages = async () => {
  const response = await instance.get(apiRoutes.getMessagesData)
  return response.data
  // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin' }, ...]
}

export default getMessages
