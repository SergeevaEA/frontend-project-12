import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setChannels } from '../slices/channels.js'
import getChannels from '../api/getChannelsData.js'
import DefaultChannel from './DefaultChannel.jsx'
import UserChannel from './UserChannel.jsx'

const ChannelsBlock = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getChannels()
      .then(data => dispatch(setChannels(data)))
  }, [dispatch])
  const { entities, ids } = useSelector(state => state.channels)
  const orderedChannels = ids.map(id => entities[id])
  const defaultChannels = orderedChannels.filter(channel => channel.removable === false)
  const userChannels = orderedChannels.filter(channel => channel.removable === true)
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {defaultChannels.map(channel => (
        <DefaultChannel
          key={channel.id}
          channelName={channel.name}
          channelId={channel.id}
        />
      ))}
      {userChannels.map(channel => (
        <UserChannel
          key={channel.id}
          channelName={channel.name}
          channelId={channel.id}
        />
      ))}
    </ul>
  )
}

export default ChannelsBlock
