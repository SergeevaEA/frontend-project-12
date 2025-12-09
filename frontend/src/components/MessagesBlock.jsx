import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { setMessages } from '../slices/messages.js'
import getMessages from '../api/getMessagesData.js'
import Message from './Message'

const MessagesList = () => {
  const dispatch = useDispatch()
  const chatRef = useRef(null)
  const messagesIds = useSelector(state => state.messages.ids)
  const messagesCount = messagesIds.length
  useEffect(() => {
    chatRef.current?.scrollIntoView()
  })
  useEffect(() => {
    getMessages()
      .then((data) => {
        chatRef.current?.scrollIntoView()
        dispatch(setMessages(data))
        return data
      })
  }, [messagesCount, dispatch])
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
      <div ref={chatRef}></div>
    </div>
  )
}

export default MessagesList
