import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import addChannel from '../api/addChannel.js'
import { useRef, useEffect, useState } from 'react'
import * as yup from 'yup'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import filter from '../profanityFilter.js'
import { useDispatch } from 'react-redux'
import { setCurrentChannelId } from '../slices/channels.js'

const AddChannelForm = ({ isOpen, setIsOpen }) => {
    const inputRef = useRef(null)
    const token = useSelector(state => state.user.token)
    const channels = useSelector(state => state.channels.entities)
    const channelsNames = Object.values(channels).map(channel => channel.name)
    const [ isDisabled, setIsDisabled ] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const AddChannelSchema = yup.object().shape({
        name: yup
            .string()
            .min(3, t('errors.eighteenSimbols'))
            .max(20, t('errors.eighteenSimbols'))
            .test('isUnique', t('errors.unique'), value => !channelsNames.includes(value)),
    })

    const formik = useFormik({
        initialValues: { name: '' },
        validationSchema: AddChannelSchema,
        onSubmit: async (value, { resetForm }) => {
            setIsDisabled(true)
            try {
                const name = filter.clean(value.name)
                const newChannel = await addChannel(token, { name })
                dispatch(setCurrentChannelId(newChannel.id))
                resetForm()
                setIsOpen(false)
                toast(t('success.channelCreated'))
            } catch {
                toast(t('errors.networkError'))
            } finally {
                setIsDisabled(false)
            }
        }
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
