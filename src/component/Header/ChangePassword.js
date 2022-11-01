import { Modal, Row, Form, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { putUpdatePassword } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ChangePassword = (props) => {
    const account = useSelector(state => state.user.account);
    const { t } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {

    }, [])


    const handleUpdatePassword = async () => {
        let res = await putUpdatePassword(currentPassword, newPassword);
        console.log("check res")
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }
    console.log("account", account);

    return (
        <>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>{t('profile.password.curPassword')}</Form.Label>
                            <Form.Control
                                type="password"
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                            // disabled
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>{t('profile.password.newPassword')}</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            // disabled
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>{t('profile.password.confPassword')}</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            // disabled
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={() => handleUpdatePassword()}>
                    {t('profile.password.update')}
                </Button>
            </Modal.Footer>
        </>
    )
}
export default ChangePassword;