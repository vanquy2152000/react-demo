import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const { t } = useTranslation();

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id)

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }

  return (
    <>

      <Modal
        show={show}
        backdrop="static"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('manage.delete.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('manage.delete.text')} : <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('manage.delete.cancel')}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            {t('manage.delete.confirm')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;