import _ from "lodash";
import { Form } from "react-bootstrap";

const Question = (props) => {
    const { data, index } = props;

    if (_.isEmpty(data))
        return (<></>)

    const handleHanleCheckBox = (event, aId, qId) => {
        props.handleCheckBox(aId, qId)
    }

    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img src={`data:image/jpeg;base64,${data.image}`} alt="img" />
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