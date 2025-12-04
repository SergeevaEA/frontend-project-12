import * as yup from 'yup'

const editChannelSchema = (channelsNames, channelName, t) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(3, t('errors.eighteenSimbols'))
      .max(20, t('errors.eighteenSimbols'))
      .required(t('errors.required'))
      .test('isUnique', t('errors.unique'), value => value === channelName || !channelsNames.includes(value)),
  })
}

export default editChannelSchema
