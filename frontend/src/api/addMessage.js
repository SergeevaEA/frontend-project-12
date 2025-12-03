import axios from 'axios'

const addMessage = async (token, newMessage) => {
  // Example: newMessage = { body: 'new message', channelId: '1', username: 'admin' }
  const response = await axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
}

export default addMessage
