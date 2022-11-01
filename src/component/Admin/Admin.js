import Sidebar from "./Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-toastify/dist/ReactToastify.css';
import Language from './../Header/Language';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { logOut } from "../../services/apiServices";
import { doLogOut } from "../../redux/action/userAction";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Profile from './../Header/Profile';

const Admin = (props) => {
    const { t, i18n } = useTranslation();
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(false);
    const [showModalProfile, setShowModalProfile] = useState(false);

    const handleLogOut = async () => {
        let res = await logOut(account.email, account.refresh_token);

        if (res && res.EC === 0) {
            //clear data redux
            dispatch(doLogOut());
            Navigate("/login");
        } else {
            toast.error(res.EM)
        }

    }
    const handleProfile = () => {
        setShowModalProfile(true);
    }

    return (
        <>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <Sidebar collapsed={collapsed} />
                </div>
                <div className="admin-content">
                    <div className="admin-header">
                        <span onClick={() => setCollapsed(!collapsed)}>
                            <FaBars className="leftside" />
                        </span>

                        <div className="rightside">
                            <Language />
                            <NavDropdown title={i18n.language === "vi" ? "Cài Đặt" : "Setting"} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => handleProfile()}>{t('header.setting.profile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.setting.logout')}</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>
                    <div className="admin-main">
                        <PerfectScrollbar>
                            <Outlet />
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
            <Profile    
                show={showModalProfile}
                setShow={setShowModalProfile}
            />
        </>
    )
}
export default Admin;