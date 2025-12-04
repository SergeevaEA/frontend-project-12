import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setMessages } from '../slices/messages.js'
import getMessages from '../api/getMessagesData.js'
import Message from './Message'

const MessagesList = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  useEffect(() => {
    getMessages(token)
      .then(data => dispatch(setMessages(data)))
  }, [token, dispatch])
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const { entities, ids } = useSelector(state => state.messages)
  const orderedMessages = ids.map(id => entities[id])
  const currentChannelMessages = orderedMessages
    .filter(message => message.channelId === currentChannelId)
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages
        .map(message => (
          <Message
            key={message.id}
            username={message.username}
            text={message.body}
          />
        ))}
    </div>
  )
}

export default MessagesList
