import { useSelector, useDispatch } from "react-redux"
import { setCurrentChannelId } from "../slices/channels"

const UserChannel = ({ channelName, channelId }) => {
    const dispatch = useDispatch()
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const isCurrent = (channelId === currentChannelId) ? true : false
    const handleClick = () => {
        dispatch(setCurrentChannelId(channelId))
    }
    return (
        <li className="nav-item w-100">
            <div role="group" className="d-flex dropdown btn-group">
                <button type="button" onClick={handleClick} className={`w-100 rounded-0 text-start text-truncate btn ${isCurrent ? 'btn-secondary' : ''}`}>
                    <span className="me-1">#</span>{channelName}</button>
                    <button type="button" id="react-aria2985184757-:r0:" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
                    <span className="visually-hidden">Управление каналом</span>
                </button>
                <div x-placement="bottom-start" aria-labelledby="react-aria2985184757-:r0:" className="dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start" style={{position: 'absolute', inset: '0px auto auto 0px', transform: 'translate3d(232.5px, 348px, 0px)'}}>
                    <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0" href="#">Удалить</a>
                    <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0" href="#">Переименовать</a>
                </div>
            </div>
        </li>
    )
}

export default UserChannel