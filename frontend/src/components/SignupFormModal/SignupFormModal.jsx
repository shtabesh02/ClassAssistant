//SignupFormModal.jsx
import { useState } from 'react';
import { useDispatch} from 'react-redux';
//import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  //const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
      return dispatch(
        sessionActions.subscribe({
          email,
          firstName,
          lastName,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {

            setErrors(data.errors);
          }

        });
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1 className='signup-title'>Stay In The Loop</h1>
        <p className="signup-subtitle">Subscribe to get notifications on time</p>
      </div>
      
      <form className='signup-form' onSubmit={handleSubmit}>
        <div className="input-group">
          <label className='input-label'>Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">📧</span>
            <input
              className='form-input'
              placeholder='Enter your email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errors.email && (
            <div className='error-message'>
              <span className="error-icon">⚠</span>
              {errors.email}
            </div>
          )}
        </div>

        <div className="input-group">
          <label className='input-label'>First Name</label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              className='form-input'
              placeholder='Your first name'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          {errors.firstName && (
            <div className='error-message'>
              <span className="error-icon">⚠</span>
              {errors.firstName}
            </div>
          )}
        </div>

        <div className="input-group">
          <label className='input-label'>Last Name</label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              className='form-input'
              placeholder='Your last name'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          {errors.lastName && (
            <div className='error-message'>
              <span className="error-icon">⚠</span>
              {errors.lastName}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            className={`subscribe-button ${(!email || !firstName || !lastName) ? 'disabled' : ''}`}
            type="submit"
            disabled={!email || !firstName || !lastName}
          >
            🔔 Subscribe Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;