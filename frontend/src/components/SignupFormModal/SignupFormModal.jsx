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
    <>
      <h1 className='signup'>Subscribe to get notifications on time.</h1>
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
      


        <button
            className='signup-form-button'
            type="submit"
            disabled = {!email || !firstName || !lastName}
            >
              Subscribe
        </button>

      </form>
    </>
  );
}

export default SignupFormModal;
