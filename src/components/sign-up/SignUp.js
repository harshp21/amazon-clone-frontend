import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user-context/user-context';
import './sign-up.css';

function SignUp() {

    const [userCredentails, setUserCredentials] = useState({ emailId: '', password: '', confirmPassword: '', username: '' });
    const userContext = useContext(UserContext);

    const onSubmitHandler = () => {
        userContext.signUpUser(userCredentails);
    }

    return (
        <div className="form-cntainer">
            <img className="form__logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazon-logo" />
            <div className="form__container">
                <div className="form__container_title">Create Account</div>
                <div className="form__container_form">
                    <div className="form-label">Your name</div>
                    <input type="email" value={userCredentails.username} onChange={(e) => setUserCredentials({ ...userCredentails, username: e.target.value })} className="input-field" />

                    <div className="form-label">Email ID</div>
                    <input type="email" value={userCredentails.emailId} onChange={(e) => setUserCredentials({ ...userCredentails, emailId: e.target.value })} className="input-field" />

                    <div className="form-label">Password</div>
                    <input type="password" value={userCredentails.password} onChange={(e) => setUserCredentials({ ...userCredentails, password: e.target.value })} className="input-field" />

                    <div className="form-label">Confirm password</div>
                    <input type="password" value={userCredentails.confirmPassword} onChange={(e) => setUserCredentials({ ...userCredentails, confirmPassword: e.target.value })} className="input-field" />

                    <div className="form-info">
                        Passwords must be at least 6 characters.
                        <br />
                        You will be sent a mail to activate account on the given mail id
                    </div>

                    <div className="form-btn-container">
                        <div className="form-btn" onClick={onSubmitHandler}>Sign up</div>
                    </div>

                    <div className="form-footer">Already have an account?
                        <Link to="/sign-in" className="link">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
