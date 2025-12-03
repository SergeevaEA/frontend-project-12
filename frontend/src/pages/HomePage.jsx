import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/HomePageHeader';
import PlusButton from '../components/PlusButton';
import ChannelsBlock from '../components/ChannelsBlock';
import CurrentChannelInfoBlock from '../components/CurrentChannelInfoBlock';
import MessagesBlock from '../components/MessagesBlock';
import MessageInputBlock from '../components/MessageInputBlock';
import AddChannelForm from '../components/AddChannelForm';
import { login } from '../slices/user';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const handle = () => ((!token) ? navigate('/login') : dispatch(login({ username, token })));
    handle();
  }, [navigate, dispatch]);
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <PlusButton onClick={() => setIsOpen(true)} />
              <AddChannelForm isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <ChannelsBlock />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <CurrentChannelInfoBlock />
              <MessagesBlock />
              <div className="mt-auto px-5 py-3">
                <MessageInputBlock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
