import { useSelector, useDispatch } from "react-redux";
import { setCurrentChannelId } from "../slices/channels";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";

const UserChannel = ({ channelName, channelId }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(state => state.channels.currentChannelId);
  const isCurrent = channelId === currentChannelId;

  const handleClick = () => {
    dispatch(setCurrentChannelId(channelId));
  };

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex w-100">
        <Button
          className="w-100 text-start text-truncate rounded-0"
          variant={isCurrent ? "secondary" : "light"}
          onClick={handleClick}
        >
          <span className="me-1 text-truncate">#</span>{channelName}
        </Button>

        <Dropdown.Toggle split variant={isCurrent ? "secondary" : "light"} />

        <Dropdown.Menu>
          <Dropdown.Item href="#" as="button">
            Удалить
          </Dropdown.Item>
          <Dropdown.Item href="#" as="button">
            Переименовать
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default UserChannel;
