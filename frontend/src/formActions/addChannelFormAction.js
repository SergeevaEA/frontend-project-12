import { toast } from 'react-toastify'
import filter from '../profanityFilter.js'
import addChannel from '../api/addChannel.js'
import { setCurrentChannelId } from '../slices/channels.js'

const addChannelFormAction = async (setIsDisabled, setIsOpen, t, dispatch, value, { resetForm }) => {
  setIsDisabled(true)
  try {
    const name = filter.clean(value.name)
    const newChannel = await addChannel({ name })
    dispatch(setCurrentChannelId(newChannel.id))
    resetForm()
    setIsOpen(false)
    toast(t('success.channelCreated'))
  }
  catch {
    toast(t('errors.networkError'))
  }
  finally {
    setIsDisabled(false)
  }
}

export default addChannelFormAction
