import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setChannels } from '../slices/channels.js'
import getChannels from '../api/getChannelsData.js'
import DefaultChannel from './DefaultChannel.jsx'

const ChannelsBlock = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(() => {
        getChannels(token)
            .then(data => dispatch(setChannels(data)))
    }, [token])
    const { entities, ids } = useSelector(state => state.channels)
    const orderedChannels = ids.map(id => entities[id])
    const defaultChannels = orderedChannels.filter(channel => channel.removable === false)
    const userChannels = orderedChannels.filter(channel => channel.removable === true)
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    return (
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {defaultChannels.map(channel => <DefaultChannel key={channel.id} channelName={channel.name} channelId={channel.id} />)}
            {/*{userChannels.map(channel => <UserChannel key={channel.id} name={channel.name} />)}
                <li className="nav-item w-100">
                    <div role="group" className="d-flex dropdown btn-group">
                        <button type="button" className="w-100 rounded-0 text-start text-truncate btn">
                        <span className="me-1">#</span>123123</button>
                        <button type="button" id="react-aria2985184757-:r0:" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
                            <span className="visually-hidden">Управление каналом</span>
                        </button>
                        <div x-placement="bottom-start" aria-labelledby="react-aria2985184757-:r0:" className="dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; transform: translate3d(232.5px, 348px, 0px);">
                            <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Удалить</a>
                            <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Переименовать</a>
                        </div>
                    </div>
                </li>
                <li className="nav-item w-100">
                    <div role="group" className="d-flex dropdown btn-group">
                        <button type="button" className="w-100 rounded-0 text-start text-truncate btn">
                            <span className="me-1">#</span>ggggg
                        </button>
                                <button type="button" id="react-aria2985184757-:r1:" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
                                    <span className="visually-hidden">Управление каналом</span>
                                </button>
                                <div x-placement="bottom-start" aria-labelledby="react-aria2985184757-:r1:" className="dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="true" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; transform: translate3d(232.5px, 395px, 0px);">
                                    <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Удалить</a>
                                    <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Переименовать</a>
                                </div>
                                </div>
                            </li>
                            <li className="nav-item w-100"><div role="group" className="d-flex dropdown btn-group">
                                <button type="button" className="w-100 rounded-0 text-start text-truncate btn btn-secondary">
                                <span className="me-1">#</span>ererer</button>
                                <button type="button" id="react-aria2985184757-:r2:" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary">
                                <span className="visually-hidden">Управление каналом</span>
                                </button>
                                <div x-placement="top-start" aria-labelledby="react-aria2985184757-:r2:" className="dropdown-menu" data-popper-reference-hidden="true" data-popper-escaped="true" data-popper-placement="top-start" style="position: absolute; inset: auto auto 0px 0px; transform: translate3d(232.5px, -45px, 0px);">
                                <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Удалить</a>
                                <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Переименовать</a>
                                </div>
                            </div>
                            </li>
                            */}
        </ul>
    )
}

export default ChannelsBlock