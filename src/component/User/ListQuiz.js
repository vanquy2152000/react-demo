import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAllQuiz } from '../../services/apiServices';
import './ListQuiz.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        let res = await getAllQuiz();
        if (res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }
    return (
        <div className="list-quiz-container container">
            {
                arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz, index) => {
                    return (
                        <Card style={{ width: '18rem' }} key={`${index}-quiz`}>
                            <Card.Img variant="top" src={`data:image/jpeg;base64,${quiz.image}`} />
                            <Card.Body>
                                <Card.Title>Quiz {index + 1}</Card.Title>
                                <Card.Text>
                                    {quiz.description}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                >Start Now</Button>
                            </Card.Body>
                        </Card>
                    )
                })
            }

        </div>
    );
}

export default ListQuiz;