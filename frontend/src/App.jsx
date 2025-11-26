import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import SigninPage from './pages/SigninPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { ToastContainer } from 'react-toastify'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App
