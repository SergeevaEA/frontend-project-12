import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { removeChannel } from '../slices/channels.js'
import removeChannelRequest from '../api/removeChannelRequest.js'

const RemoveChannelForm = ({ channelId, isOpenRemoveChannelForm, setIsOpenRemoveChannelForm }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    return (
        <Modal show={isOpenRemoveChannelForm} onHide={() => setIsOpenRemoveChannelForm(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">Уверены?</p>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsOpenRemoveChannelForm(false)} className="me-2">
                         Отменить
                    </Button>
                    <Button type="submit" variant="danger" onClick={async () => { await removeChannelRequest(token, channelId); dispatch(removeChannel(channelId))}}>Удалить</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RemoveChannelForm