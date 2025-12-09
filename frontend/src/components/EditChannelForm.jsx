import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import editChannelSchema from '../schemas/editChannelSchema.js'
import editChannelFormAction from '../formActions/editChannelFormAction.js'

const EditChannelForm = ({
  channelId, channelName, isOpenEditChannelForm, setIsOpenEditChannelForm,
}) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const channels = useSelector(state => state.channels.entities)
  const channelsNames = Object.values(channels).map(channel => channel.name)

  useEffect(() => {
    if (isOpenEditChannelForm) {
      inputRef.current.focus()
    }
  }, [isOpenEditChannelForm])

  const formik = useFormik({
    initialValues: { name: channelName },
    enableReinitialize: true, // инициализируем форму каждый раз, когда initialValues изменяются
    validationSchema: editChannelSchema(channelsNames, channelName, t),
    onSubmit: async (value, { resetForm }) => {
      editChannelFormAction(channelId, setIsDisabled, setIsOpenEditChannelForm, t, value, { resetForm })
    },
  })

  return (
    <Modal show={isOpenEditChannelForm} onHide={() => setIsOpenEditChannelForm(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('editChannel')}</Modal.Title>
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
              autoComplete="off"
            />
            <Form.Label className="visually-hidden">{t('channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => setIsOpenEditChannelForm(false)} className="me-2">
              {t('buttons.notSend')}
            </Button>
            <Button type="submit" disabled={isDisabled} variant="primary">{t('buttons.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditChannelForm
