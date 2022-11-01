import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { logOut } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import { DiReact } from "react-icons/di";
import './Header.scss';
import Profile from './Profile';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const { t, i18n } = useTranslation();

    const [showModalProfile, setShowModalProfile] = useState(false);

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const handleProfile = () => {
        setShowModalProfile(true);
    }

    const handleLogOut = async () => {
        let res = await logOut(account.email, account.refresh_token);

        if (res && res.EC === 0) {
            //clear data redux
            dispatch(doLogOut());
            navigate("/login");
        } else {
            toast.error(res.EM)
        }

    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavLink to="/" className="navbar-brand">
                        <DiReact className="brand-icon" />
                        Tobi
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">{t('header.home')}</NavLink>
                            <NavLink to="/admins" className="nav-link">{t('header.admin')}</NavLink>
                            <NavLink to="/users" className="nav-link">{t('header.user')}</NavLink>
                        </Nav>
                        <Nav>
                            {
                                isAuthenticated === false ?
                                    <>
                                        <button
                                            className="btn-login"
                                            onClick={() => handleLogin()}
                                        >
                                            {t('header.login')}
                                        </button>
                                        <button
                                            className="btn-signup"
                                            onClick={() => handleRegister()}
                                        >
                                            {t('header.signup')}
                                        </button>
                                    </>
                                    :
                                    <NavDropdown title={i18n.language === "vi" ? "Cài Đặt" : "Setting"} id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={() => handleProfile()}>{t('header.setting.profile')}</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.setting.logout')}</NavDropdown.Item>
                                    </NavDropdown>
                            }
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile
                show={showModalProfile}
                setShow={setShowModalProfile}
            />
        </>
    );
}

export default Header;