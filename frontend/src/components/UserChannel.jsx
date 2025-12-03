import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { setCurrentChannelId } from "../slices/channels";
import RemoveChannelForm from './RemoveChannelForm.jsx'
import EditChannelForm from "./EditChannelForm.jsx";
import { useTranslation } from 'react-i18next';

const UserChannel = ({ channelName, channelId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const isCurrent = channelId === currentChannelId

  const [ isOpenRemoveChannelForm, setIsOpenRemoveChannelForm ] = useState(false)
  const [ isOpenEditChannelForm, setIsOpenEditChannelForm ] = useState(false)

  const handleClick = () => {
    dispatch(setCurrentChannelId(channelId))
  };

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex w-100">
        <Button
          className="w-100 text-start text-truncate rounded-0"
          variant={isCurrent ? "secondary" : "light"}
          onClick={handleClick}
        >
          <span className="me-1 text-truncate">{t('hash')}</span>{channelName}
        </Button>
        <Dropdown.Toggle split variant={isCurrent ? "secondary" : "light"}>
          <span class="visually-hidden">{t('controlChannel')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu renderMenuOnMount={true}>
          <Dropdown.Item onClick={() => setIsOpenRemoveChannelForm(true)} as="button">
            {t('buttons.remove')}
            <span className="visually-hidden">{t('buttons.remove')}</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setIsOpenEditChannelForm(true)} as="button">
            {t('buttons.edit')}
            <span className="visually-hidden">{t('buttons.edit')}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <RemoveChannelForm channelId={channelId} isOpenRemoveChannelForm={isOpenRemoveChannelForm} setIsOpenRemoveChannelForm={setIsOpenRemoveChannelForm} />
      <EditChannelForm channelId={channelId} channelName={channelName} isOpenEditChannelForm={isOpenEditChannelForm} setIsOpenEditChannelForm={setIsOpenEditChannelForm}/>
    </li>
  );
};

export default UserChannel;
