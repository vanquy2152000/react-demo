import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postSignup } from '../../services/apiServices';
import './Register.scss';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from './../Header/Language';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [showPassword, setShowPassword] = useState(false);


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSingup = async () => {
        //validate
        const isValidateEmail = validateEmail(email);

        if (!isValidateEmail) {
            toast.error("Invalid Email");
            return;
        }

        if (!password) {
            toast.error("Invalid Password");
            return;
        }


        //submit apis
        let data = await postSignup(email, password, username);

        console.log("Check data", data)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className="register-container">
            <div className="header">
                <span>Already have an account?</span>
                <button
                    className="btn-login"
                    onClick={() => navigate('/login')}
                >
                    Log in
                </button>
                <Language />
            </div>
            <div className="title col-4 mx-auto">
                Tobi
            </div>
            <div className="welcome col-4 mx-auto">
                Start your journey?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email (*)</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group pass-group">
                    <label>Password (*)</label>
                    <input
                        id="password-field"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {showPassword ?
                        <span
                            className="icons-eye"
                            onClick={() => setShowPassword(false)}
                        >
                            <VscEye />
                        </span>
                        :
                        <span
                            className="icons-eye"
                            onClick={() => setShowPassword(true)}
                        >
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="Username"
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <button
                        className="btn-register"
                        onClick={() => handleSingup()}
                    >
                        Create my free account
                    </button>
                </div>
                <div className="text-center">
                    <span
                        className="back"
                        onClick={() => navigate('/')}
                    >
                        &#60;&#60; Go To Homepage
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Register;