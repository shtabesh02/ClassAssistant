import { NavLink } from "react-router-dom"
import './settings.css';

function Settings() {
  return (
    <div className="settings">
        <h1>Settings</h1>
        <hr />
        <ul>
            <li>
                <NavLink to={`/announcements`}>Announcements</NavLink>
            </li>
            <li>
                <NavLink to={`/students`}>List of students</NavLink>
            </li>
            <li>
                <NavLink to={`/assignments`}>Assignments</NavLink>
            </li>
            <li>
                <NavLink to={`/quizzes`}>Quizzes</NavLink>
            </li>
            {/* <li>
                <NavLink>Classes</NavLink>
            </li> */}
        </ul>
    </div>
  )
}

export default Settings