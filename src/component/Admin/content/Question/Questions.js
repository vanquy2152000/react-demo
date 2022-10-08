import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Select from 'react-select';
import './Questions.scss';
import { TbCirclePlus, TbCircleMinus } from "react-icons/tb";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        },
    ]);
    console.log("questions", questions);

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: 'question 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }

            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone);
        }

        console.log("Check ", type, id)
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            // tim vi tri cau hoi
            let index = questionsClone.findIndex(item => item.id === questionId)
            console.log("index", index)

            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);

        }

        console.log("Check ", type, questionId, answerId)
    }


    return (
        <div className="question-container">
            <div className="title">
                manage questions
            </div>
            <hr />
            <div className="add-new-question">
                <div className="col-6">
                    <label className="mb-2">Select Quiz :</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>

                <div className="mt-3 mb-2">
                    Add new question
                </div>
                {questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className="q-main mb-4">
                                <div className="question-content">
                                    <FloatingLabel
                                        label={`Question ${index + 1} 's Description`}
                                        className="mb-3 description"
                                    >
                                        <Form.Control
                                            value={question.description}
                                            placeholder="Description" />
                                    </FloatingLabel>
                                    <div className="group-upload">
                                        <label>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input type={"file"} hidden />
                                        <span>0 file is uploaded</span>
                                    </div>
                                    <div className="btn-add">
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <TbCirclePlus className="icon-add" />
                                        </span>

                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <TbCircleMinus className="icon-remove" />
                                            </span>
                                        }
                                    </div>
                                </div>

                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answers-content">
                                                <Form.Check
                                                    className="iscorrect"
                                                    type="checkbox"
                                                // checked={item.isSelected}
                                                // onChange={(event) => handleHanleCheckBox(event, item.id, data.questionId)}
                                                // label={item.description}
                                                />

                                                <FloatingLabel
                                                    label={`Answer ${index + 1}`}
                                                    className="answer-name"
                                                >
                                                    <Form.Control
                                                        value={answer.description}
                                                        placeholder="Answer" />
                                                </FloatingLabel>
                                                <div className="btn-group">
                                                    {/* 2 vong lap => answer phu thuoc vao id cua question */}
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiOutlinePlusCircle className="icon-add" />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className="icon-remove" />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}
export default Questions;