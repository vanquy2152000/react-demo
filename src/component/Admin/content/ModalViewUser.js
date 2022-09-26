import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _ from "lodash";

const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email);
            setUsername(dataView.username);
            setRole(dataView.role);
            setImage("");
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
            }
        }
    }, [dataView])

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>View A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="*************"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    disabled
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    onChange={(event) => setRole(event.target.value)}
                                    value={role}
                                    disabled

                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                            </Form.Group>

                            <Form.Group as={Col} className="img-preview">
                                {previewImage ?
                                    <img src={previewImage} alt="" />
                                    :
                                    <span>Preview img</span>
                                }
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;