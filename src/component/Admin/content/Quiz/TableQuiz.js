import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useTranslation } from 'react-i18next';

const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const { t } = useTranslation();

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
            <div className="mb-3">{t('manage.quiz.listquiz')}</div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>{t('manage.quiz.id')}</th>
                        <th>{t('manage.quiz.name')}</th>
                        <th>{t('manage.quiz.description')}</th>
                        <th>{t('manage.quiz.type')}</th>
                        <th>{t('manage.quiz.action')}</th>
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
                                        className="btn btn-warning">{t('manage.quiz.edit')}</button>
                                    <button
                                        onClick={() => handleClickDeleteQuiz(item)}
                                        className="btn btn-danger">{t('manage.quiz.delete')}</button>
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