import { logout } from '../slices/user.js'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/login')
    }
    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <Link className="navbar-brand" to="/">Hexlet Chat</Link>
                <button type="button" onClick={handleClick} className="btn btn-primary">Выйти</button>
            </div>
        </nav>
    )
}

export default Header