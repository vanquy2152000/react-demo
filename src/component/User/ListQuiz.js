import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getQuizByUser } from '../../services/apiServices';
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        let res = await getQuizByUser();
        console.log("res", res)
        if (res && res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }

    return (
        <div className="list-quiz-container container">
            {
                arrQuiz && arrQuiz.length > 0 ?
                    arrQuiz.map((quiz, index) => {
                        return (
                            <Card style={{ width: '18rem' }} key={`${index}-quiz`}>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${quiz.image}`} />
                                <Card.Body>
                                    <Card.Title>{t('quiz.quiz')} {index + 1}</Card.Title>
                                    <Card.Text>
                                        {quiz.description}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                    >{t('quiz.start')}</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                    :
                    <>
                        You don't have any quiz now...
                    </>
            }
        </div>
    );
}

export default ListQuiz;