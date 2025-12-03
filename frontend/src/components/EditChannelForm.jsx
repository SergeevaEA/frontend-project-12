import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import editChannelRequest from '../api/editChannelRequest.js';
import filter from '../profanityFilter.js';

const EditChannelForm = ({
  channelId, channelName, isOpenEditChannelForm, setIsOpenEditChannelForm,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const token = useSelector((state) => state.user.token);
  const channels = useSelector((state) => state.channels.entities);
  const channelsNames = Object.values(channels).map((channel) => channel.name);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (isOpenEditChannelForm) {
      inputRef.current.focus();
    }
  }, [isOpenEditChannelForm]);

  const EditChannelSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('errors.eighteenSimbols'))
      .max(20, t('errors.eighteenSimbols'))
      .required(t('errors.required'))
      .test('isUnique', t('errors.unique'), (value) => value === channelName || !channelsNames.includes(value)),
  });

  const formik = useFormik({
    initialValues: { name: channelName },
    enableReinitialize: true, // инициализируем форму каждый раз, когда initialValues изменяются
    validationSchema: EditChannelSchema,
    onSubmit: async (value, { resetForm }) => {
      setIsDisabled(true);
      try {
        const name = filter.clean(value.name);
        await editChannelRequest(token, channelId, name);
        resetForm();
        setIsOpenEditChannelForm(false);
        toast(t('success.channelEdited'));
      } catch {
        toast(t('errors.networkError'));
      } finally {
        setIsDisabled(false);
      }
    },
  });

  return (
    <Modal show={isOpenEditChannelForm} onHide={() => setIsOpenEditChannelForm(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('editChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Control
              name="name"
              ref={inputRef}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Label className="visually-hidden">{t('channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => setIsOpenEditChannelForm(false)} className="me-2">
              {t('buttons.notSend')}
            </Button>
            <Button type="submit" disabled={isDisabled} variant="primary">{t('buttons.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelForm;
