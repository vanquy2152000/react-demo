import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from './App';
import User from './component/User/User';
import Admin from './component/Admin/Admin';
import HomePage from './component/Home/HomePage';
import DashBoard from './component/Admin/content/DashBoard';
import ManageUser from './component/Admin/content/ManageUser';
import Login from './component/Auth/Login';
import { ToastContainer } from 'react-toastify';
import Register from "./component/Auth/Register";

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="/users" element={<User />} />
                </Route>
                <Route path="/admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
export default Layout;