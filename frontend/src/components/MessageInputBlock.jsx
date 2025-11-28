import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { postMessage } from '../slices/messages.js'
import addMessage from '../api/addMessage.js'
import EnterButton from './EnterButton.jsx'

const MessageInputBlock = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const token = useSelector(state => state.user.token)
    const username = useSelector(state => state.user.username)
    const currentChannelId = useSelector(state => state.channels.currentChannelId)

    useEffect(() => {
        inputRef.current.focus()
    })

    const formik = useFormik({
        initialValues: { body: '' },
        onSubmit: async (values, { resetForm }) => {
            if (values.body !== '') {
                await addMessage(token, { body: values.body, channelId: currentChannelId, username })
                    .then(message => {
                        dispatch(postMessage(message))
                        resetForm()
                    })
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
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                />
                <EnterButton disabled={formik.values.body.trim() === ''}/>
            </InputGroup>
        </Form>
  )
}

export default MessageInputBlock
