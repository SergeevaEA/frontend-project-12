import { useSelector } from 'react-redux'
import pluralize from 'pluralize-ru'
import { useTranslation } from 'react-i18next'

const CurrentChannelInfoBlock = () => {
  const { t } = useTranslation()
  const currentChannelId = useSelector((state) => state.channels.currentChannelId)
  const currentName = useSelector((state) => state.channels.entities[currentChannelId].name)
  const numerOfMessages = useSelector((state) => Object.values(state.messages.entities)
    .filter((message) => message.channelId === currentChannelId)
    .length)
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          <span className="me-1">{t('hash')}</span>
          {currentName}
        </b>
      </p>
      <span className="text-muted">
        {numerOfMessages}
        {' '}
        {pluralize(numerOfMessages, 'сообщений', 'сообщение', 'сообщения', 'сообщений')}
      </span>
    </div>
  )
}

export default CurrentChannelInfoBlock
