import ModalCreateUser from "./ModalCreateUser";


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
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}
export default ManageUser;