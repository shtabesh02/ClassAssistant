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
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {

    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {

            setErrors(data.errors);
          }

        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1 className='signup'>Sign Up</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label className='form-label'>
          <input
            className='input'
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='form-error-message'>{errors.email}</p>}
        <label className='form-label'>
          <input
            className='input'
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='form-error-message'>{errors.username}</p>}
        <label className='form-label'>
          <input
            className='input'
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='form-error-message'>{errors.firstName}</p>}
        <label className='form-label'>
          <input
            className='input'
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='form-error-message'>{errors.lastName}</p>}
        <label className='form-label'>
          <input
            className='input'
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='form-error-message'>{errors.password}</p>}
        <label className='form-label'>
          <input
            className='input'
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className='form-error-message'>{errors.confirmPassword}</p>}

        <button
            className='signup-form-button'
            type="submit"
            disabled = {!email || !username || username.length < 4 || !firstName || !lastName || !password || password.length < 6 || !confirmPassword}
            >
              Sign Up
        </button>

      </form>
    </>
  );
}

export default SignupFormModal;
