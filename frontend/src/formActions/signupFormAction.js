import { toast } from 'react-toastify'
import signupRequest from '../api/signupRequest.js'
import { login } from '../slices/user.js'

const signupFormAction = async (setIsDisabled, t, dispatch, navigate, values) => {
  setIsDisabled(true)
  try {
    const data = await signupRequest(values)
    const { token } = data
    const { username } = values
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    dispatch(login({ username, token }))
    navigate('/')
  }
  catch (error) {
    const handle = () => ((error.response.status === 409) ? toast(t('errors.alreadyExists')) : toast(t('errors.networkError')))
    handle()
  }
  finally {
    setIsDisabled(false)
  }
}

export default signupFormAction
