import { FloatingLabel, Form, Button } from "react-bootstrap";
import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from 'react-toastify';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async (data) => {
        // validate
        if (!name || !description) {
            toast.error("Name/Description is required")
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setImage(null);
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage quizzes
            </div>
            <hr />
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add New Quiz</legend>
                    <FloatingLabel label="Name" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="your name quiz"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Description " className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </FloatingLabel>


                    <Form.Group className="mb-3">
                        <Select
                            defaultValue={type}
                            onChange={setType}
                            options={options}
                            placeholder="Quiz type...."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="description"
                            onChange={(event) => handleChangeFile(event)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button
                            onClick={() => handleSubmitQuiz()}
                            variant="warning">Save</Button>
                    </Form.Group>
                </fieldset>
            </div>
            <div className="list-detail">
                table
            </div>
        </div >
    )
}

export default ManageQuiz;