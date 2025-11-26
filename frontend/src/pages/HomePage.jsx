import { useNavigate } from 'react-router-dom'
import Header from '../components/HomePageHeader'
import PlusButton from '../components/PlusButton'
import ChannelsBlock from '../components/ChannelsBlock'
import CurrentChannelInfoBlock from '../components/CurrentChannelInfoBlock'
import MessagesBlock from '../components/MessagesBlock'
import MessageInputBlock from '../components/MessageInputBlock'
import AddChannelForm from '../components/AddChannelForm'
import { useEffect } from 'react'

const HomePage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/signin')
        }
    }, [navigate])
    return (
        <div>
            <div className="d-flex flex-column h-100">
                <Header />
                <div className="container h-100 my-4 overflow-hidden rounded shadow">
                    <div className="row h-100 bg-white flex-md-row">
                        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                                <b>Каналы</b>
                                <PlusButton />
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
        </div>)
}

export default HomePage