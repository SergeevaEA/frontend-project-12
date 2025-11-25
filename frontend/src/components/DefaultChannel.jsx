const DefaultChannel = ({ channelName, isCurrent }) => {
    return (
        <li className="nav-item w-100">
                <button type="button" className={`w-100 rounded-0 text-start btn ${isCurrent ? 'btn-secondary' : ''}`}><span className="me-1">#</span>{channelName}</button>
        </li>
    )
}

export default DefaultChannel