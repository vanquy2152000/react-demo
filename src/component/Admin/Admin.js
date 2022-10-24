import Sidebar from "./Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react"
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-toastify/dist/ReactToastify.css';
import Language from './../Header/Language';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t, i18n } = useTranslation();

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
                                <NavDropdown.Item>{t('header.setting.profile')}</NavDropdown.Item>
                                <NavDropdown.Item>{t('header.setting.logout')}</NavDropdown.Item>
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
        </>
    )
}
export default Admin;