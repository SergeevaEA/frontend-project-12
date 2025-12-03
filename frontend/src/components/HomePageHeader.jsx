import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { logout } from '../slices/user.js'

const Header = () => {
  const { t } = useTranslation()
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
        <Link className="navbar-brand" to="/">{t('hexletChat')}</Link>
        <button type="button" onClick={handleClick} className="btn btn-primary">{t('buttons.logout')}</button>
      </div>
    </nav>
  )
}

export default Header
