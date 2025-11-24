import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setMessages } from '../slices/messages.js'
import getMessages from '../api/getMessagesData.js'

const MessagesList = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(() => {
        getMessages(token)
            .then(data => dispatch(setMessages(data)))
    }, [token])
    return (
        <div></div>
    )
}

export default MessagesList
