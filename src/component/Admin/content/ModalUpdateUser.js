import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices';
import _ from "lodash";

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate])

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        props.resetBtnUpdate();
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleUpdateUser = async () => {
        const isValidateEmail = validateEmail(email);

        if (!isValidateEmail) {
            toast.error("Invalid Email");
            return;
        }



        let data = await putUpdateUser(dataUpdate.id, username, role, image)

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUsers();
            // props.setCurrentPage(props.currentPage);
            await props.fetchListUsersWithPaginate(props.currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add New User
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update A User</Modal.Title>
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
                                    placeholder="****************"
                                    // value={password}
                                    // onChange={(event) => setPassword(event.target.value)}
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
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    onChange={(event) => setRole(event.target.value)}
                                    value={role}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label className="label-upload" htmlFor="labelUpload">
                                    <FcPlus />
                                    Upload File Image
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    name="file"
                                    hidden
                                    id="labelUpload"
                                    onChange={(event) => handleUploadImage(event)}
                                />
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
                    <Button variant="primary" onClick={() => handleUpdateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;