import { Tab, Tabs, Modal } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import History from "./History";

const Profile = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false)
    };

    return (

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
            className="modal-add-user"
        >
            <Modal.Header closeButton>
                <Modal.Title>{t('profile.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="userinfo"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="userinfo" title={t('profile.userinfo.userinfo')}>
                        <UserInfo />
                    </Tab>
                    <Tab eventKey="password" title={t('profile.password.password')}>
                        <ChangePassword />
                    </Tab>
                    <Tab eventKey="history" title={t('profile.history.history')}>
                        <History />
                    </Tab>
                </Tabs>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                        {t('manage.update.close')}
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateUser()}>
                        {t('manage.update.save')}
                    </Button>
            </Modal.Footer> */}
        </Modal>


    )
}

export default Profile;