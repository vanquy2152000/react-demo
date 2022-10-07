import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Select from 'react-select';
import './Questions.scss';
import { TbCirclePlus, TbCircleMinus } from "react-icons/tb";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})

    return (
        <div className="question-container">
            <div className="title">
                manage questions
            </div>
            <div className="add-new-question">
                <div className="col-6">
                    <label>Select Quiz :</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>

                <div className="mt-3">
                    Add new question
                </div>
                <div className="question-content">
                    <FloatingLabel
                        label="Description"
                        className="mb-3 description"
                    >
                        <Form.Control placeholder="Description" />
                    </FloatingLabel>
                    <div className="group-upload">
                        <label className="label-up">Upload Image</label>
                        <input type={"file"} hidden />
                        <span>0 file is uploaded</span>
                    </div>
                    <div className="btn-add">
                        <span>
                            <TbCirclePlus className="icon-add" />
                        </span>
                        <span>
                            <TbCircleMinus className="icon-remove" />
                        </span>
                    </div>
                </div>
                <div className="answers-content">
                    {/* <input
                        className="form-check-input"
                        type="checkbox" /> */}

                    <Form.Check
                        className="iscorrect"
                        type="checkbox"
                    // checked={item.isSelected}
                    // onChange={(event) => handleHanleCheckBox(event, item.id, data.questionId)}
                    // label={item.description}
                    />

                    <FloatingLabel
                        label="Answer 1"
                        className="answer-name"
                    >
                        <Form.Control placeholder="Answer" />
                    </FloatingLabel>
                    <div className="btn-group">
                        <span>
                            <AiOutlinePlusCircle className="icon-add" />
                        </span>
                        <span>
                            <AiOutlineMinusCircle className="icon-remove" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Questions;