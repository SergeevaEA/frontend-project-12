import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import addMessage from '../api/addMessage.js'
import EnterButton from './EnterButton.jsx'
import filter from '../profanityFilter.js'

const MessageInputBlock = () => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const token = useSelector(state => state.user.token)
  const username = useSelector(state => state.user.username)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    inputRef.current.focus()
  })

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      setIsDisabled(true)
      try {
        if (values.body !== '') {
          const text = filter.clean(values.body)
          await addMessage(token, { body: text, channelId: currentChannelId, username })
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
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate>
      <InputGroup hasValidation>
        <Form.Control
          name="body"
          ref={inputRef}
          aria-label="Новое сообщение"
          placeholder={t('writeMessage')}
          className="border-0 p-0 ps-2"
          onChange={formik.handleChange}
          value={formik.values.body}
        />
        <EnterButton disabled={isDisabled || formik.values.body.trim() === ''} />
      </InputGroup>
    </Form>
  )
}

export default MessageInputBlock
