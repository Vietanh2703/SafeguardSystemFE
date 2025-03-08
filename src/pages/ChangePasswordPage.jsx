import { useState } from 'react';

const ChangePasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            // Handle password change logic here
            console.log('Password changed successfully');
        } else {
            console.log('Passwords do not match');
        }
    };

    return (
        <div className="change-password-page">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
};

export default ChangePasswordPage;