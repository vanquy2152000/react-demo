import { useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import ModalResultQuiz from "./ModalResultQuiz";
import RightContent from './Content/RightContent';
import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const { t } = useTranslation();


    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [isShowModalResultQuiz, setIsShowModalResultQuiz] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription,
                        image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers);
                    });
                    answers = _.orderBy(answers, ['id'], ['asc'])
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    };

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
    };

    const handleCheckBox = (answerId, questionId) => {
        // clone dataQuiz de tim va cap nhat question
        // react hook doesn't merge state
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(
            (item) => +item.questionId === +questionId
        );
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        }

        // tìm câu hoi vừa được cập nhật
        let index = dataQuizClone.findIndex(
            (item) => +item.questionId === +questionId
        );
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: [],
        };

        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = question.questionId;
                let userAnswerId = [];

                //todo : userAnswerId
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                });
            });

            payload.answers = answers;

            //submit api
            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setIsSubmitQuiz(true);
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResultQuiz(true);

                //update DataQuiz with correct answer
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a = res.DT.quizData;
                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].questionId) {
                                //update answer
                                let newAnswer = [];
                                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                    let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                    if (s) {
                                        dataQuizClone[i].answers[j].isCorrect = true;
                                    }
                                    newAnswer.push(dataQuizClone[i].answers[j])
                                }
                                dataQuizClone[i].answers = newAnswer;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }

            }
            else {
                alert("Something Wrong......")
            }
        }
    };

    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true);
    }

    return (
        <>
            <Breadcrumb className="quiz-detail-new-header">
                <NavLink to='/' className="breadcrumb-item">
                    {t('header.home')}
                </NavLink>
                <NavLink to='/users' className="breadcrumb-item">
                    {t('header.user')}
                </NavLink>
                <Breadcrumb.Item active>
                    {t('header.quiz')}
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title">
                        Quiz {quizId}: {location?.state?.quizTitle}
                    </div>
                    <hr />
                    <div className="q-content">
                        <Question
                            index={index}
                            handleCheckBox={handleCheckBox}
                            isShowAnswer={isShowAnswer}
                            isSubmitQuiz={isSubmitQuiz}
                            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                        />
                    </div>
                    <div className="footer">
                        <button className="btn btn-secondary" onClick={() => handlePrev()}>
                            Prev
                        </button>
                        <button className="btn btn-primary" onClick={() => handleNext()}>
                            Next
                        </button>
                        <button
                            disabled={isSubmitQuiz}
                            className="btn btn-warning"
                            onClick={() => handleFinishQuiz()}
                        >
                            Finish
                        </button>
                    </div>
                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndex={setIndex}
                    />
                </div>
                <ModalResultQuiz
                    show={isShowModalResultQuiz}
                    setShow={setIsShowModalResultQuiz}
                    dataModalResult={dataModalResult}
                    handleShowAnswer={handleShowAnswer}
                />
            </div>
        </>

    );
};

export default DetailQuiz;
