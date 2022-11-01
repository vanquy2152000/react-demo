import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuizForAdmin } from '../../../../services/apiServices';
import { useTranslation } from 'react-i18next';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;

    const { t } = useTranslation();

    const handleClose = () => setShow(false);
    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuizForAdmin(dataDelete.id);
        console.log("check data delete : ", data)

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // props.setCurrentPage(1);
            await props.fetchQuiz();
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
                    <Modal.Title>{t('manage.deletequiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('manage.deletequiz.text')}<b>{dataDelete.id}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('manage.deletequiz.cancel')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        {t('manage.deletequiz.confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;