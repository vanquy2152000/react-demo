import _ from "lodash";
import { Form } from "react-bootstrap";
import Lightbox from "react-awesome-lightbox";
import { useState } from 'react';


const Question = (props) => {
    const { data, index } = props;

    const [isPreviewImage, setIsPreviewImage] = useState(false);

    if (_.isEmpty(data))
        return (<></>)

    const handleHanleCheckBox = (event, aId, qId) => {
        props.handleCheckBox(aId, qId)
    }

    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${data.image}`} alt="img" />
                    {
                        isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}>
                        </Lightbox>
                    }
                </div>
                :
                <div className="q-image">

                </div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription} ?</div>

            <div className="answer">
                {data.answers && data.answers.length &&
                    data.answers.map((item, index) => {
                        return (
                            <div
                                key={`answers-${index}`}
                                className="a-child"
                            >
                                <Form.Check
                                    type="checkbox"
                                    checked={item.isSelected}
                                    onChange={(event) => handleHanleCheckBox(event, item.id, data.questionId)}
                                    label={item.description}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;