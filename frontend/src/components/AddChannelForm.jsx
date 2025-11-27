import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import addChannel from '../api/addChannel.js'
import { postNewChannel } from '../slices/channels.js';
import { setCurrentChannelId } from '../slices/channels.js';
import React from 'react';
import { useEffect } from 'react';
import * as yup from 'yup'

const AddChannelForm = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const channels = useSelector(state => state.channels.entities)
    const channelsNames = Object.values(channels).map(channel => channel.name)
    const AddChannelSchema = yup.object().shape({
        name: yup
                .string()
                .min(3, 'От 3 до 20 символов')
                .max(20, 'От 3 до 20 символов')
                .required('Обязательное поле')
                .test(
                    'isUnique',
                    'Должно быть уникальным',
                    (value) => {
                        return !channelsNames.includes(value)
                    }
                ),
    })
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: AddChannelSchema,
        onSubmit: async (value, { resetForm }) => {
            const newChannel = await addChannel(token, { name: value.name })
            dispatch(postNewChannel(newChannel))
            dispatch(setCurrentChannelId(newChannel.id))
            resetForm()
            setIsOpen(false)
        }
    })

    // Сбрасываем форму каждый раз при открытии модалки
    useEffect(() => {
        if (isOpen) {
            formik.resetForm();
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <React.Fragment>
            <div className="fade modal-backdrop show"></div> {/* затемненный фон, который появляется за модальным окном */}
            <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{display: "block"}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">Добавить канал</div>
                            <button onClick={() => setIsOpen(false)} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"></button>
                        </div>
                            <div className="modal-body">
                                <form onSubmit={formik.handleSubmit} className="">
                                    <div>
                                        <input name="name" id="name" onBlur={formik.handleBlur}  className={`mb-2 form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} onChange={formik.handleChange} value={formik.values.name} />
                                        <label className="visually-hidden" htmlFor="name">Имя канала</label>
                                        <div className="invalid-feedback">{formik.errors.name}</div>
                                        <div className="d-flex justify-content-end">
                                            <button onClick={() => setIsOpen(false)} type="button" className="me-2 btn btn-secondary">Отменить</button>
                                            <button type="submit" className="btn btn-primary">Отправить</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddChannelForm