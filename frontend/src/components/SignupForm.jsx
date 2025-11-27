import { useFormik } from 'formik'
import axios from 'axios'
import avatar from '../assets/avatar_1.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../slices/user.js'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

const SignupSchema = yup.object().shape({
    username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
    password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать').required('Обязательное поле'),
})

const SignupForm = () => {
    // Возвращает метод store.dispatch() текущего хранилища
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            await axios.post('/api/v1/signup', { username: values.username, password: values.password } )
                .then((response) => {
                  const token = response.data.token
                  const username = values.username
                  localStorage.setItem('token', token)
                  localStorage.setItem('username', username)
                  dispatch(login({ username, token }))
                  navigate('/')
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        toast('Пользователь с таким логином уже существует')
                    }
                })
        }
    });
    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                    <div>
                        <img src={avatar} className="rounded-circle" alt="Регистрация" />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="w-50">
                        <h1 className="text-center mb-4">Регистрация</h1>
                        <div className="form-floating mb-3">
                            <input placeholder="От 3 до 20 символов" name="username" autoComplete="username" required="" id="username" onBlur={formik.handleBlur} className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`} onChange={formik.handleChange} value={formik.values.username} />
                            <div placement="right" className="invalid-tooltip">{formik.errors.username}</div>
                            <label className="form-label" htmlFor="username">Имя пользователя</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="password" onBlur={formik.handleBlur} className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} onChange={formik.handleChange} value={formik.values.password} />
                            <div className="invalid-tooltip">{formik.errors.password}</div>
                            <label className="form-label" htmlFor="password">Пароль</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input placeholder="Пароли должны совпадать" name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" onBlur={formik.handleBlur} className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`} onChange={formik.handleChange} value={formik.values.confirmPassword} />
                            <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                            <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                        </div>
                        <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>)
}

export default SignupForm