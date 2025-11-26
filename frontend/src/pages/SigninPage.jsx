import Header from '../components/LoginPageHeader.jsx'
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