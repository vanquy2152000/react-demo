import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResultQuiz = (props) => {
    const { show, setShow, dataModalResult, handleShowAnswer } = props;

    const handleClose = () => {
        setShow(false)
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>View A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Question : {dataModalResult.countTotal}</div>
                    <div>Total Correct Answer : {dataModalResult.countCorrect}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        handleShowAnswer();
                    }}>
                        Show Correct Answer
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResultQuiz;