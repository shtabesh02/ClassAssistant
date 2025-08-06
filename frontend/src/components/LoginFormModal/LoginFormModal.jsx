//LoginFormModal.jsx:
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data);
        }
    });
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'yitian', password: 'password1' }))
      .then(closeModal)
    // alert("No API defined yet.")
  }

  const handleDisableLogin = credential.length < 4 || password.length < 6

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className='login-title'>Welcome Back</h1>
        <p className="login-subtitle">Log in with your account</p>
      </div>
      
      <form className='login-form' onSubmit={handleSubmit}>
        {errors.message && (
          <div className='error-message'>
            <span className="error-icon">⚠</span>
            The provided credentials were invalid
          </div>
        )}
        
        <div className="input-group">
          <label className='input-label'>Username or Email</label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input 
              className='form-input'
              type="text"
              value={credential}
              placeholder="Enter your username or email"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className='input-label'>Password</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input 
              className='form-input'
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            className={`login-button ${handleDisableLogin ? 'disabled' : ''}`}
            type="submit"
            disabled={handleDisableLogin}
          >
            Log In
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button 
            className='demo-login-button'
            type='button'
            onClick={handleDemoLogin}
          >
            🎯 Try Demo Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;