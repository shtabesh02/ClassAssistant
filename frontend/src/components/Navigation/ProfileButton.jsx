import { useState, useEffect, useRef } from 'react';
import { useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from  './OpenModalMenuItem'
import LoginFormModal from '../LoginFormModal/LoginFormModal';

import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useNavigate } from 'react-router-dom'
import './ProfileButton.css'

function ProfileButton({ user }) {

  console.log('user from session: ', user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const handleNav = () => {
    navigate('/settings')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='toggle-button' onClick={toggleMenu}>
      <div className="profileIcon">
      <i className="fa-solid fa-bars"></i>
      <i className="fas fa-user-circle fa-2x"/>
      </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleNav}>Settings</button>
            </li>


            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Subscribe"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
