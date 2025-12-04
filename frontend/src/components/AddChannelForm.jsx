import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import addChannelSchema from '../schemas/addChannelSchema.js'
import addChannelFormAction from '../formActions/addChannelFormAction.js'

const AddChannelForm = ({ isOpen, setIsOpen }) => {
  const inputRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels.entities)
  const channelsNames = Object.values(channels).map(channel => channel.name)

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: addChannelSchema(t, channelsNames),
    onSubmit: async (value, { resetForm }) => {
      addChannelFormAction(setIsDisabled, setIsOpen, t, dispatch, value, { resetForm })
    },
  })

  // Ставим фокус при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      formik.resetForm()
    }
    if (isOpen && inputRef.current) {
      // таймаут нужен, чтобы модальное окно успело отрендериться
      setTimeout(() => inputRef.current.focus(), 0)
    }
  }, [isOpen])

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Control
              name="name"
              ref={inputRef}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Label className="visually-hidden">{t('channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => setIsOpen(false)}>
              {t('buttons.notSend')}
            </Button>
            <Button type="submit" disabled={isDisabled} variant="primary">{t('buttons.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelForm
