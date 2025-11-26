import { useSelector, useDispatch } from "react-redux"
import { setCurrentChannelId } from "../slices/channels"

const DefaultChannel = ({ channelName, channelId }) => {
    const dispatch = useDispatch()
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const isCurrent = (channelId === currentChannelId) ? true : false
    const handleClick = () => {
        dispatch(setCurrentChannelId(channelId))
    }
    return (
        <li className="nav-item w-100">
                <button type="button" onClick={handleClick} className={`w-100 rounded-0 text-start btn ${isCurrent ? 'btn-secondary' : ''}`}><span className="me-1">#</span>{channelName}</button>
        </li>
    )
}

export default DefaultChannel