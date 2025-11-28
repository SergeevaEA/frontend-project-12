import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import addChannel from '../api/addChannel.js'
import { postNewChannel, setCurrentChannelId } from '../slices/channels.js';
import { useEffect } from 'react';
import * as yup from 'yup'
import { Modal, Button, Form } from 'react-bootstrap'

const AddChannelForm = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const channels = useSelector(state => state.channels.entities)
    const channelsNames = Object.values(channels).map(channel => channel.name)

    const AddChannelSchema = yup.object().shape({
        name: yup
            .string()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле')
            .test('isUnique', 'Должно быть уникальным', value => !channelsNames.includes(value)),
    })

    const formik = useFormik({
        initialValues: { name: '' },
        validationSchema: AddChannelSchema,
        onSubmit: async (value, { resetForm }) => {
            const newChannel = await addChannel(token, { name: value.name })
            dispatch(postNewChannel(newChannel))
            dispatch(setCurrentChannelId(newChannel.id))
            resetForm()
            setIsOpen(false)
        }
    })

    // Сбрасываем форму каждый раз при открытии модалки
    useEffect(() => {
        if (isOpen) formik.resetForm()
    }, [isOpen])

    return (
        <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="name" className="mb-3">
                        <Form.Control
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            isInvalid={formik.touched.name && !!formik.errors.name}
                            placeholder="Имя канала"
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={() => setIsOpen(false)}>
                            Отменить
                        </Button>
                        <Button type="submit" variant="primary">Отправить</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddChannelForm
