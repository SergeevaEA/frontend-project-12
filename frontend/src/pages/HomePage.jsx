import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    if (!token) {
        navigate('/login')
    }
    return <h1>Главная страница</h1>
}

export default HomePage