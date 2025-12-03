import axios from 'axios';

const signupRequest = async (values) => {
  const response = await axios
    .post('/api/v1/signup', { username: values.username, password: values.password });
  return response.data; // => { token: ..., username: 'newuser' }
};

export default signupRequest;
