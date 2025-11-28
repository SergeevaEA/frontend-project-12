import avatar from '../assets/avatar.jpg'
import { Card, Form, Button } from 'react-bootstrap'
import loginRequest from '../api/loginRequest.js'
import { toast } from 'react-toastify'
import { login } from '../slices/user.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useRef, useEffect } from 'react'

const LoginForm = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            loginRequest(values).then((data) => {
                const token = data.token;
                const username = values.username;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                dispatch(login({ username, token }));
                navigate('/');
              })
            .catch(() => toast('Неверные имя пользователя или пароль'));
        },
    });

    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={avatar} className="rounded-circle" alt="Войти" />
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3" controlId="username">
                    <Form.Control
                      name="username"
                      ref={inputRef}
                      autoFocus
                      type="text"
                      placeholder="Ваш ник"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <Form.Label>Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4" controlId="password">
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Пароль"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Label>Пароль</Form.Label>
                  </Form.Group>
                  <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                    Войти
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    );
};

export default LoginForm;
