import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { getAllQuiz } from "../../../../services/apiServices";

const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        console.log("check res : ", res);
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    return (
        <>
            <div className="mb-3">List Quizzes : </div>
            <Table striped bordered hover mt-3>
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
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </>
    )
}

export default TableQuiz;