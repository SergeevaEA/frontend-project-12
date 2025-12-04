import axios from 'axios'
import { apiRoutes } from './apiRoutes'

const signupRequest = async (values) => {
  const response = await axios
    .post(apiRoutes.signupRequest, { username: values.username, password: values.password })
  return response.data // => { token: ..., username: 'newuser' }
}

export default signupRequest
