import { useFormik } from 'formik'
import addChannel from '../api/addChannel.js'
import { postNewChannel } from '../slices/channels.js';
import React from 'react';

const AddChannelForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: async (value) => addChannel(token, { name: value.name }).then(newChannel => {
            dispatch(postNewChannel(newChannel))
        })
    });
    return (
        <React.Fragment>
            <div className="fade modal-backdrop show"></div> // затемненный фон, который появляется за модальным окном
            <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{display: "block"}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">Добавить канал</div>
                            <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit} className="">
                                <div>
                                    <input name="name" id="name" className="mb-2 form-control" onChange={formik.handleChange} value={formik.values.name} />
                                    <label className="visually-hidden" htmlFor="name">Имя канала</label>
                                    <div className="invalid-feedback"></div>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="me-2 btn btn-secondary">Отменить</button>
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