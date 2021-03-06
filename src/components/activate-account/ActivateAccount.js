import React, { useContext } from 'react';
import { UserContext } from '../../context/user-context/user-context';
import './activate-account.css';
import { useParams } from 'react-router-dom';
import './activate-account.css';

function ActivateAccount() {

    const params = useParams();
    const userContext = useContext(UserContext);

    const activateAccount = () => {
        userContext.activateAccount(params.activationCode);
    }
    return (
        <div className='account-activation'>
            <div className="account-activation__content">
                <div className="account-activation__content_title">Just one more step...</div>
                <div className="account-activation__content_subtitle">Click the button below to activate the whats app clone account</div>
                <div className="account-activation__content_logo">
                    <div className="account-activation__content_app-name"> Amazon Clone</div>
                </div>
                <div className="account-activation__content_btn">
                    <div className="activation-btn" onClick={activateAccount}>Acitvate Account</div>
                </div>
            </div>
        </div>
    )

}

export default ActivateAccount
