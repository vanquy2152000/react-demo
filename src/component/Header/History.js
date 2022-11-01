
import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { getHistory } from '../../services/apiServices';
import moment from 'moment/moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const History = () => {
    const [listHistory, setListHistory] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            let newData = res?.DT?.data?.map(item => {
                return {
                    id: item.id,
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    time: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            if (newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length);
            }
            setListHistory(newData);
        }
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>{t('profile.history.no')}</th>
                    <th>{t('profile.history.quizName')}</th>
                    <th>{t('profile.history.totalQuestion')}</th>
                    <th>{t('profile.history.totalCorrect')}</th>
                    <th>{t('profile.history.time')}</th>
                </tr>
            </thead>
            <tbody>
                {listHistory && listHistory.length > 0
                    && listHistory.map((item, index) => {
                        return (
                            <tr key={`table-users-${index}`} >
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.total_questions}</td>
                                <td>{item.total_correct}</td>
                                <td>{item.time}</td>
                            </tr>
                        )
                    })}

            </tbody>
        </Table >
    )
}

export default History;