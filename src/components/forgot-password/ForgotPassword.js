import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';
import { UserContext } from '../../context/user-context/user-context';
import "./forgot-password.css";

function ForgotPassword() {

    const [emailId, setEmailId] = useState('');
    const userContext = useContext(UserContext);

    const onSubmitHandler = () => {
        if (validator.isEmail(emailId)) {
            userContext.retrievePassword(emailId);
        } else {
            toast.error('Enter a valid email id');
        }
    }

    return (
        <div className="form-cntainer">
            <img className="form__logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazon-logo" />
            <div className="form__container">
                <div className="form__container_title">Password assistance</div>
                <div className="form__container_subtitle">Enter the email address or mobile phone number associated with your Amazon account.</div>
                <div className="form__container_form">

                    <div className="form-label">Email ID</div>
                    <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input-field" />

                    <div className="form-info">
                        <b> Has your email address or mobile phone number changed?</b>
                        <br />
                        If you no longer use the e-mail address associated with your Amazon account, you may contact Customer Service for help restoring access to your account.


                    </div>

                    <div className="form-btn-container">
                        <div className="form-btn" onClick={onSubmitHandler}>Retrieve password</div>
                    </div>

                    <div className="form-footer"> Remember your credentials?
                        <Link to="/sign-in" className="link">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
