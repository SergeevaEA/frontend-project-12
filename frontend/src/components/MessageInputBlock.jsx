import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import EnterButton from './EnterButton.jsx'
import messageInputBlockAction from '../formActions/messageInputBlockAction.js'

const MessageInputBlock = () => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const username = useSelector(state => state.user.username)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    inputRef.current.focus()
  })

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      messageInputBlockAction(username, currentChannelId, setIsDisabled, t, values, { resetForm })
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
          autoComplete="off"
        />
        <EnterButton disabled={isDisabled || formik.values.body.trim() === ''} />
      </InputGroup>
    </Form>
  )
}

export default MessageInputBlock
