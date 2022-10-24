import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaGem, FaGithub } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import sidebarBg from '../../assets/images/bg2.jpg';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Sidebar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    return (
        <ProSidebar
            image={sidebarBg}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    className="logo"
                    onClick={() => navigate('/')}
                >
                    <DiReact size="3em" color="blue" />
                    <span >Tobi</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<MdDashboard />}
                    >
                        {t('sidebar.dashboard')}
                        <Link to="/admins" className="nav-link" />
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        icon={<FaGem />}
                        title={i18n.language === "vi" ? "Chức Năng" : "Features"}
                    >
                        <MenuItem>
                            {t('sidebar.features.user')}
                            <Link to="/admins/manage-users" className="nav-link" />
                        </MenuItem>
                        <MenuItem>
                            {t('sidebar.features.quiz')}
                            <Link to="/admins/manage-quizzes" className="nav-link" />
                        </MenuItem>
                        <MenuItem>
                            {t('sidebar.features.question')}
                            <Link to="/admins/manage-questions" className="nav-link" />
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <a
                        href="https://github.com/vanquy2152000?tab=repositories"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            viewSource
                        </span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    )
}

export default Sidebar;