import EnterButton from './EnterButton'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { postMessage } from '../slices/messages.js'
import addMessage from '../api/addMessage.js'

const MessageInputBlock = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const username = useSelector(state => state.user.username)
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: async (value, { resetForm }) => addMessage(token, {body: value.body, channelId: currentChannelId, username }).then(message => {
            dispatch(postMessage(message))
            resetForm()
        })
    });
    return (
        <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
                <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" onChange={formik.handleChange} value={formik.values.body} />
                <EnterButton />
            </div>
        </form>
    )
}

export default MessageInputBlock