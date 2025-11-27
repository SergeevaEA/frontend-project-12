import Header from '../components/LoginAndSignupPageHeader.jsx'
import LoginForm from '../components/LoginForm.jsx'

const LoginPage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <LoginForm />
        </div>
    )
}

export default LoginPage