import Header from '../components/Header.jsx'
import SigninForm from '../components/SigninForm.jsx'

const LoginPage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <SigninForm />
        </div>
    )
}

export default LoginPage