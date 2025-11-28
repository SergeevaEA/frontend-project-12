import { useFormik } from 'formik'
import avatar from '../assets/avatar_1.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../slices/user.js'
import { useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import * as yup from 'yup'
import { Card, Form, Button } from 'react-bootstrap'
import signupRequest from '../api/signupRequest.js'

const SignupSchema = yup.object().shape({
    username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
    password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать').required('Обязательное поле'),
});

const SignupForm = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
        signupRequest(values)
            .then((data) => {
                const token = data.token;
                const username = values.username;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                dispatch(login({ username, token }));
                navigate('/');
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    toast('Пользователь с таким логином уже существует');
                }
            });
        },
    });

    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src={avatar} className="rounded-circle" alt="Регистрация" />
                </div>
                <Form onSubmit={formik.handleSubmit} className="w-50">
                  <h1 className="text-center mb-4">Регистрация</h1>

                  <Form.Group className="form-floating mb-3" controlId="username">
                    <Form.Control
                      name="username"
                      ref={inputRef}
                      autoFocus
                      placeholder="От 3 до 20 символов"
                      autoComplete="username"
                      required
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={formik.touched.username && !!formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                    <Form.Label>Имя пользователя</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3" controlId="password">
                    <Form.Control
                      name="password"
                      placeholder="Не менее 6 символов"
                      type="password"
                      autoComplete="new-password"
                      required
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                    <Form.Label>Пароль</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                    <Form.Control
                      name="confirmPassword"
                      placeholder="Пароли должны совпадать"
                      type="password"
                      autoComplete="new-password"
                      required
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                    <Form.Label>Подтвердите пароль</Form.Label>
                  </Form.Group>

                  <Button type="submit" className="w-100" variant="outline-primary">
                    Зарегистрироваться
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
};

export default SignupForm;
