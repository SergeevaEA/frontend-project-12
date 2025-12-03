import axios from 'axios';

const removeChannelRequest = async (token, id) => {
  const path = `/api/v1/channels/${id}`;
  const response = await axios.delete(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // => { id: '3' }
};

export default removeChannelRequest;
