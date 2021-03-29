import React, { useState, useContext } from 'react'
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/user-context/user-context';

function ResetPassword() {

    const [resetPasswordDetails, setResetPasswordDetails] = useState({ password: '', confirmPassword: '' });
    const userContext = useContext(UserContext);

    const params = useParams();

    const onSubmitHandler = () => {
        const { password, confirmPassword } = resetPasswordDetails;
        if (password.length < 6 || confirmPassword.length < 6) {
            toast.error('Password and confirm password length should be greater than 6');
        } else if (password !== confirmPassword) {
            toast.error('Password and confirm password should be same');
        } else {
            userContext.resetPassword(resetPasswordDetails, params.resetToken);
        }
    }
    return (
        <div className="form-cntainer">
            <img className="form__logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazon-logo" />
            <div className="form__container">
                <div className="form__container_title">Create new password</div>
                <div className="form__container_subtitle">We'll ask for this password whenever you sign in.</div>
                <div className="form__container_form">

                    <div className="form-label">New password</div>
                    <input type="password" value={resetPasswordDetails.password} onChange={(e) => setResetPasswordDetails({ ...resetPasswordDetails, password: e.target.value })} className="input-field" />

                    <div className="form-label">Password again</div>
                    <input type="password" value={resetPasswordDetails.confirmPassword} onChange={(e) => setResetPasswordDetails({ ...resetPasswordDetails, confirmPassword: e.target.value })} className="input-field" />

                    <div className="form-info">
                        <h5><b>Secure password tips:</b></h5>
                        <ul className="form-info__list">
                            <li>Use at least 8 characters, a combination of numbers and letters is best.</li>
                            <li>Do not use the same password you have used with us previously.</li>
                            <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.</li>
                            <li>Do not use the same password for multiple online accounts.</li>
                        </ul>
                    </div>

                    <div className="form-btn-container">
                        <div className="form-btn" onClick={onSubmitHandler}>Save Changes and sign in</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
