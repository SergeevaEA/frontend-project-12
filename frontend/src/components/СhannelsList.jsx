import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setChannels } from '../slices/channels.js'
import getChannels from '../api/getChannelsData.js'

const ChannelsList = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(() => {
        getChannels(token)
            .then(data => dispatch(setChannels(data)))
    }, [token])
    return (
        <div></div>
    )
}

export default ChannelsList