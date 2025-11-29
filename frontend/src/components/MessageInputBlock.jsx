import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { postMessage } from '../slices/messages.js'
import addMessage from '../api/addMessage.js'
import EnterButton from './EnterButton.jsx'
import { useState } from 'react'
import { toast } from 'react-toastify'

const MessageInputBlock = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const token = useSelector(state => state.user.token)
    const username = useSelector(state => state.user.username)
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const [ isDisabled, setIsDisabled ] = useState(false)

    useEffect(() => {
        inputRef.current.focus()
    })

    const formik = useFormik({
        initialValues: { body: '' },
        onSubmit: async (values, { resetForm }) => {
            setIsDisabled(true)
            try {
                if (values.body !== '') {
                    const message = await addMessage(token, { body: values.body, channelId: currentChannelId, username })
                    dispatch(postMessage(message))
                    resetForm()
                }
            } catch {
                resetForm()
                toast('Ошибка соединения')
            } finally {
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
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                />
                <EnterButton disabled={isDisabled || formik.values.body.trim() === ''}/>
            </InputGroup>
        </Form>
  )
}

export default MessageInputBlock
