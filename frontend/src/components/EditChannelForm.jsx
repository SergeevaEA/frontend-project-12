import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import * as yup from 'yup'
import { editChannel } from '../slices/channels.js'
import editChannelRequest from '../api/removeChannelRequest.js'
import { toast } from 'react-toastify'

const EditChannelForm = ({ channelId, channelName, isOpenEditChannelForm, setIsOpenEditChannelForm }) => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const token = useSelector(state => state.user.token)
    const channels = useSelector(state => state.channels.entities)
    const channelsNames = Object.values(channels).map(channel => channel.name)
    const [ isDisabled, setIsDisabled ] = useState(false)

    useEffect(() => {
        if (isOpenEditChannelForm) {
            inputRef.current.focus()
        }
    }, [isOpenEditChannelForm])

    const EditChannelSchema = yup.object().shape({
        name: yup
            .string()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле')
            .test('isUnique', 'Должно быть уникальным', value => value === channelName || !channelsNames.includes(value)),
    })

    const formik = useFormik({
        initialValues: { name: channelName },
        enableReinitialize: true, // инициализируем форму каждый раз, когда initialValues изменяются
        validationSchema: EditChannelSchema,
        onSubmit: async (value, { resetForm }) => {
            setIsDisabled(true)
            try {
                await editChannelRequest(token, channelId, value.name);
                dispatch(editChannel({ id: channelId, newName: value.name} ))
                resetForm()
                setIsOpenEditChannelForm(false)
                toast('Канал переименован')
            } catch {
                toast('Ошибка соединения')
            } finally {
                setIsDisabled(false)
            }
        }
    })

    return (
        <Modal show={isOpenEditChannelForm} onHide={() => setIsOpenEditChannelForm(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Переименовать канал</Modal.Title>
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
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={() => setIsOpenEditChannelForm(false)} className="me-2">
                            Отменить
                        </Button>
                        <Button type="submit" disabled={isDisabled} variant="primary">Отправить</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditChannelForm