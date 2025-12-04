import filter from '../profanityFilter.js'
import addMessage from '../api/addMessage.js'
import { toast } from 'react-toastify'

const messageInputBlockAction = async (username, currentChannelId, setIsDisabled, t, values, { resetForm }) => {
  setIsDisabled(true)
  try {
    if (values.body !== '') {
      const text = filter.clean(values.body)
      await addMessage({ body: text, channelId: currentChannelId, username })
      resetForm()
    }
  }
  catch {
    resetForm()
    toast(t('errors.networkError'))
  }
  finally {
    setIsDisabled(false)
  }
}

export default messageInputBlockAction
