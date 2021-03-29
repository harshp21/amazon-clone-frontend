import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';
import { UserContext } from '../../context/user-context/user-context';
import './sign-in.css';

function SignIn(props) {

    const userContext = useContext(UserContext);

    const [user, setUser] = useState({ emailId: '', password: '' });

    const onSubmitHandler = () => {

        if (!validator.isEmail(user.emailId)) {
            toast.error('Enter a valid email Id');
        } else if (user.password.length < 6) {
            toast.error('Password length should be atleast 6');
        } else {
            loginUser();
        }
    }

    const loginUser = () => {
        const { location: { state } } = props;
        if (state && state.next) {
            userContext.logInUser(user, state.next);
        } else {
            userContext.logInUser(user);
        }
    }
    return (
        <div className="form-cntainer">
            <img className="form__logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazon-logo" />
            <div className="form__container">
                <div className="form__container_title">Sign in</div>
                <div className="form__container_form">
                    <div className="form-label">Email ID</div>
                    <input type="email" value={user.emailId} onChange={(e) => setUser({ ...user, emailId: e.target.value })} className="input-field" />

                    <div className="form-label">Password</div>
                    <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="input-field" />
                    <div className="forgot-password-link">
                        <Link to="/forgot-password" className="link">
                            Forgot Password
                        </Link>
                    </div>
                    <div className="form-btn-container">
                        <div className="form-btn" onClick={onSubmitHandler}>Sign in</div>
                    </div>
                    <div className="sign-in__terms-and-condition">
                        By continuing, you agree to Amazon's Conditions of use and Privacy policy
                    </div>

                    <div className="sign-in__create-account-btn">
                        <div className="create-account-btn">
                            <Link to='/sign-up'>
                                Create your amazon clone account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
