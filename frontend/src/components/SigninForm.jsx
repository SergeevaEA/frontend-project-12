import { useFormik } from 'formik'
import axios from 'axios'
import avatar from '../assets/avatar.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SigninForm = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: async (values) => {
            axios.post('/api/login', values)
                .then((response) => {
                    localStorage.setItem('token', response.data.token)
                    navigate('/')
                })
                .catch(() => toast('Неверные имя пользователя или пароль'))
        },
    });
    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src={avatar} className="rounded-circle" alt="Войти" />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3">
                        <input name="name" required placeholder="Ваш ник" type="text" id="name" className="form-control" onChange={formik.handleChange} value={formik.values.name} />
                        <label className="form-label" htmlFor="name">Ваш ник</label>
                      </div>
                      <div className="form-floating mb-4">
                        <input name="password" required placeholder="Пароль" type="password" id="password" className="form-control" onChange={formik.handleChange} value={formik.values.password} />
                        <label className="form-label" htmlFor="password">Пароль</label>
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                    </form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>Нет аккаунта? </span>
                      <a href="/signup">Регистрация</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>)
}

export default SigninForm