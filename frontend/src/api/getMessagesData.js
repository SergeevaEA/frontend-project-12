import axios from 'axios'

const getMessages = async (token) => {
    const response = await axios.get('/api/v1/messages', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin' }, ...]
}

export default getMessages
