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


const Sidebar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();

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
                        Dashboard
                        <Link to="/admins" className="nav-link" />
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        icon={<FaGem />}
                        title="Features"
                    >
                        <MenuItem>
                            Quản lý Users
                            <Link to="/admins/manage-users" className="nav-link" />
                        </MenuItem>
                        <MenuItem>
                            Quản lý Bài Quiz
                            <Link to="/admins/manage-quizzes" className="nav-link" />
                        </MenuItem>
                        <MenuItem>Quản lý Câu Hỏi</MenuItem>
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