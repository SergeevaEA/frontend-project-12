import Header from '../components/LoginAndSignupPageHeader.jsx'
import SignupForm from '../components/SignupForm.jsx'

const SignupPage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <SignupForm />
        </div>
    )
}

export default SignupPage