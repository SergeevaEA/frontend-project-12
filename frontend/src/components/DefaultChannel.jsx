import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../slices/channels';

const DefaultChannel = ({ channelName, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const isCurrent = (channelId === currentChannelId);
  const handleClick = () => {
    dispatch(setCurrentChannelId(channelId));
  };
  return (
    <li className="nav-item w-100">
      <Button
        className="w-100 rounded-0 text-start"
        variant={isCurrent ? 'secondary' : 'light'}
        onClick={handleClick}
      >
        <span className="me-1">{t('hash')}</span>
        {channelName}
      </Button>
    </li>
  );
};

export default DefaultChannel;
