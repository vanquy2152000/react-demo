import _ from 'lodash';
import { Modal, Row, Form, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FcPlus } from 'react-icons/fc';
import { putUpdateUserInfo } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const UserInfo = (props) => {
    const account = useSelector(state => state.user.account);
    const { t } = useTranslation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setUsername(account.username);
            setEmail(account.email);
            setRole(account.role);
            setImage("");
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, [account])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleUpdateInfo = async () => {
        let res = await putUpdateUserInfo(username, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>{t('profile.userinfo.username')}</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>{t('profile.userinfo.email')}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>{t('profile.userinfo.role')}</Form.Label>
                            <Form.Select
                                value={role}
                                disabled
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group className="position-relative mb-3">
                            <Form.Label className="label-upload" htmlFor="labelUpload">
                                <FcPlus />
                                {t('profile.userinfo.upload')}
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                hidden
                                id="labelUpload"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="img-preview">
                            {previewImage ?
                                <img src={previewImage} alt="" />
                                :
                                <span>{t('profile.userinfo.img')}</span>
                            }
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={() => handleUpdateInfo()}>
                    {t('profile.userinfo.update')}
                </Button>
            </Modal.Footer>
        </>
    )
}
export default UserInfo;