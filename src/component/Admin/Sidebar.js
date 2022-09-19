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
import { Link } from "react-router-dom";


const Sidebar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
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
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <DiReact size="3em" color="blue" />
                    <span>Tobi</span>
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
                        <MenuItem>Quản lý Bài Quiz</MenuItem>
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