import { toast } from 'react-toastify'
import editChannelRequest from '../api/editChannelRequest.js'
import filter from '../profanityFilter.js'

const editChannelFormAction = async (channelId, setIsDisabled, setIsOpenEditChannelForm, t, value, { resetForm }) => {
  setIsDisabled(true)
  try {
    const name = filter.clean(value.name)
    await editChannelRequest(channelId, name)
    resetForm()
    setIsOpenEditChannelForm(false)
    toast(t('success.channelEdited'))
  }
  catch {
    toast(t('errors.networkError'))
  }
  finally {
    setIsDisabled(false)
  }
}

export default editChannelFormAction
