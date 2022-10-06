import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        setDataUpdate({});
        setDataDelete({});

        let res = await getAllQuizForAdmin();

        console.log("check :", res)
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const handleClickUpdateQuiz = (quiz) => {
        setDataUpdate(quiz);
        setShowModalUpdateQuiz(true);
    }
    const handleClickDeleteQuiz = (quiz) => {
        setDataDelete(quiz);
        setShowModalDeleteQuiz(true);
    }
    return (
        <>
            <div className="mb-3">List Quizzes : </div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: 'flex', gap: '15px' }}>
                                    <button
                                        onClick={() => handleClickUpdateQuiz(item)}
                                        className="btn btn-warning">Edit</button>
                                    <button
                                        onClick={() => handleClickDeleteQuiz(item)}
                                        className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
                setDataUpdate={setDataUpdate}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
        </>
    )
}

export default TableQuiz;