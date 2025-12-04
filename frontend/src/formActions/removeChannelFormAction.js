import removeChannelRequest from '../api/removeChannelRequest.js'
import { toast } from 'react-toastify'

const removeChannelFormAction = async (channelId, setIsDisabled, t) => {
  setIsDisabled(true)
  try {
    await removeChannelRequest(channelId)
    toast(t('success.channelRemoved'))
  }
  catch {
    toast(t('errors.networkError'))
  }
  finally {
    setIsDisabled(false)
  }
}

export default removeChannelFormAction
