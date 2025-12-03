import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import removeChannelRequest from '../api/removeChannelRequest.js';

const RemoveChannelForm = ({ channelId, isOpenRemoveChannelForm, setIsOpenRemoveChannelForm }) => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.token);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <Modal show={isOpenRemoveChannelForm} onHide={() => setIsOpenRemoveChannelForm(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => setIsOpenRemoveChannelForm(false)} className="me-2">
            {t('buttons.notSend')}
          </Button>
          <Button
            type="submit"
            disabled={isDisabled}
            variant="danger"
            onClick={async () => {
              setIsDisabled(true);
              try {
                await removeChannelRequest(token, channelId);
                toast(t('success.channelRemoved'));
              } catch {
                toast(t('errors.networkError'));
              } finally {
                setIsDisabled(false);
              }
            }}
          >
            {t('buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelForm;
