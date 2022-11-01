import { FloatingLabel, Form, Button, Accordion, Tab, Tabs } from "react-bootstrap";
import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz'
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation();

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleClose = () => {
        setName("");
        setDescription("");
        setType('');
        setImage("");
    };

    const handleSubmitQuiz = async () => {
        // validate
        if (!name || !description) {
            toast.error("Name/Description is required")
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            // setName('');
            // setDescription('');
            // setImage(null);
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="quiz-container">
            <Tabs
                defaultActiveKey="quiz1"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="quiz1" title={t('manage.quiz.title1')}>
                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">{t('manage.quiz.addnew')}</legend>
                            <FloatingLabel label={t('manage.quiz.name')} className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="your name quiz"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </FloatingLabel>
                            <FloatingLabel label={t('manage.quiz.description')} className="mb-3">
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
                                    placeholder={t('manage.quiz.quiztype')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{t('manage.quiz.img')}</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="description"
                                    onChange={(event) => handleChangeFile(event)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button
                                    onClick={() => handleSubmitQuiz()}
                                    variant="warning">{t('manage.quiz.save')}</Button>
                            </Form.Group>
                        </fieldset>
                    </div>
                    <div className="list-detail">
                        <TableQuiz />
                    </div>
                </Tab>
                <Tab eventKey="quiz2" title={t('manage.quiz.title2')}>
                    <QuizQA />
                </Tab>
                <Tab eventKey="quiz3" title={t('manage.quiz.title3')}>
                    <AssignQuiz />
                </Tab>
            </Tabs>

        </div >
    )
}

export default ManageQuiz;