import * as yup from 'yup'

const addChannelSchema = (t, channelsNames) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(3, t('errors.eighteenSimbols'))
      .max(20, t('errors.eighteenSimbols'))
      .test('isUnique', t('errors.unique'), value => !channelsNames.includes(value)),
  })
}

export default addChannelSchema
