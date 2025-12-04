import axios from 'axios'
import { apiRoutes } from './apiRoutes'

const loginRequest = async (values) => {
  const response = await axios
    .post(apiRoutes.loginRequest, values)
  return response.data // => { token: ..., username: 'admin' }
}

export default loginRequest
