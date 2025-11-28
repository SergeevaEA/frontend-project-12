import axios from 'axios'

const editChannel = async (token, id, newChannelName) => {
    // Example: editChannel = { name: 'new name channel' }
    const editChannel = { name: newChannelName }
    const path = `/api/v1/channels/${id}`
    const response = await axios.patch(path, editChannel, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data // => { id: '3', name: 'new name channel', removable: true }
}

export default editChannel