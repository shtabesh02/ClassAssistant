import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const navigate = useNavigate()

    const newStudent = () => {
        navigate(`/`)
    }
    const goToHome = () => {
        navigate('/')
    }
    return (
        <ul className='navBar'>

            <div className="ca-logo" onClick={goToHome}>
                {/* <i className="fa-solid fa-ranking-star fa-3x"></i> */}
                <i className="fa-solid fa-clipboard fa-2x"></i>

                {/* <i>CA</i> */}
            </div>

            <div className="buca">
                <h1>BU Class Assistant</h1>
            </div>
            <div className='toggle-container'>
                {sessionUser && (
                    <button className='navBar-create-new-button' onClick={newStudent}>
                        Add a new studdent
                    </button>
                )}
                {isLoaded && (
                    <li className="toggle" >
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </div>

        </ul>
    );
}

export default Navigation;
