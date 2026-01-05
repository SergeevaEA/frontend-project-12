import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import avatar from '../assets/avatar_1.jpg'
import signupSchema from '../schemas/signupSchema.js'
import signupFormAction from '../formActions/signupFormAction.js'

const SignupForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      signupFormAction(setIsDisabled, t, dispatch, navigate, values)
    },
  })

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
                <h1 className="text-center mb-4 fs-2">{t('registration')}</h1>

                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                    name="username"
                    ref={inputRef}
                    autoFocus
                    placeholder="От 3 до 20 символов"
                    autoComplete="off"
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && !!formik.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                  <Form.Label>{t('username')}</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3" controlId="password">
                  <Form.Control
                    name="password"
                    placeholder={t('errors.min6Simbols')}
                    type="password"
                    autoComplete="off"
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label>{t('password')}</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                  <Form.Control
                    name="confirmPassword"
                    placeholder={t('errors.samePasswords')}
                    type="password"
                    autoComplete="off"
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  <Form.Label>{t('confirmPassword')}</Form.Label>
                </Form.Group>

                <Button type="submit" disabled={isDisabled} className="w-100" variant="outline-primary">
                  {t('buttons.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
