import axios from 'axios'

const loginRequest = async (values) => {
  const response = await axios
    .post('/api/v1/login', values)
  return response.data // => { token: ..., username: 'admin' }
}

export default loginRequest
