import { useSelector, useDispatch } from "react-redux"
import { setCurrentChannelId } from "../slices/channels"
import { Button } from 'react-bootstrap'

const DefaultChannel = ({ channelName, channelId }) => {
    const dispatch = useDispatch()
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const isCurrent = (channelId === currentChannelId) ? true : false
    const handleClick = () => {
        dispatch(setCurrentChannelId(channelId))
    }
    return (
        <li className="nav-item w-100">
            <Button 
                className="w-100 rounded-0 text-start"
                variant={isCurrent ? 'secondary' : 'light'}
                onClick={handleClick} 
            >
                <span className="me-1">#</span>{channelName}
            </Button>
        </li>
    )
}

export default DefaultChannel