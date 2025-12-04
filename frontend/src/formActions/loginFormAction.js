import loginRequest from '../api/loginRequest.js'
import { toast } from 'react-toastify'
import { login } from '../slices/user.js'

const loginFormAction = async (setIsDisabled, t, navigate, dispatch, values) => {
  setIsDisabled(true)
  try {
    const data = await loginRequest(values)
    const { token } = data
    const { username } = values
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    dispatch(login({ username, token }))
    navigate('/')
  }
  catch (error) {
    const handle = () => ((error.response.status === 401) ? toast(t('errors.usernameOrPasswordError')) : toast(t('errors.networkError')))
    handle()
  }
  finally {
    setIsDisabled(false)
  }
}

export default loginFormAction
