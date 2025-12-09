import { Card, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import avatar from '../assets/avatar.jpg'
import loginFormAction from '../formActions/loginFormAction.js'

const LoginForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      loginFormAction(setIsDisabled, t, navigate, dispatch, values)
    },
  })

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
                <h1 className="text-center mb-4">{t('buttons.login')}</h1>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                    name="username"
                    ref={inputRef}
                    autoFocus
                    type="text"
                    placeholder={t('nik')}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    autoComplete="off"
                  />
                  <Form.Label>{t('nik')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder={t('password')}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    autoComplete="off"
                  />
                  <Form.Label>{t('password')}</Form.Label>
                </Form.Group>
                <Button type="submit" disabled={isDisabled} className="w-100 mb-3" variant="outline-primary">
                  {t('buttons.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('haveNotAccaunt')}
                  {' '}
                </span>
                <a href="/signup">{t('registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
