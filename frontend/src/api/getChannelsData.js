import axios from 'axios';

const getChannels = async (token) => {
  const response = await axios.get('/api/v1/channels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // =>[{ id: '1', name: 'general', removable: false }, ...]
};

export default getChannels;
