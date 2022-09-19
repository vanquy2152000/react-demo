import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div>
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    Table User
                </div>
                <ModalCreateUser />
            </div>
        </div>
    )
}
export default ManageUser;