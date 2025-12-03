import axios from 'axios'

const addChannel = async (token, newChannel) => {
  // Example: newChannel = { name: 'new channel' }
  const response = await axios.post('/api/v1/channels', newChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data // => { id: '3', name: 'new channel', removable: true }
}

export default addChannel
