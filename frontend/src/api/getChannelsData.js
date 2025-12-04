import { apiRoutes } from './apiRoutes'
import instance from './instance'

const getChannels = async () => {
  const response = await instance.get(apiRoutes.getChannelsData)
  return response.data // =>[{ id: '1', name: 'general', removable: false }, ...]
}

export default getChannels
