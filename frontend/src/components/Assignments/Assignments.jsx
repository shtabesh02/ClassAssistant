//Assignments.jsx:
import { useState } from "react"
import './Assignments.css'
import { addAnAssignment } from "../../store/assignment"
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

function Assignments() {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const assignment = {
            title,
            dueDate,
            description
        }
        dispatch(addAnAssignment(assignment))
        .then(() => {
            alert('Th assignment added successfully.')
            navigate('/');
        });
    }

    return (
        <div className="assignments-container">
            <div className="assignments-header">
                <div className="header-icon">📋</div>
                <h1>Assignments</h1>
            </div>

            <div className="assignments-card">
                <div className="card-header">
                    <h2>Add New Assignment</h2>
                </div>
                
                <form className="assignment-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title:</label>
                        <input 
                            type="text" 
                            className="form-input"
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter assignment title"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Due Date:</label>
                        <input 
                            type="datetime-local" 
                            className="form-input date-input"
                            value={dueDate} 
                            onChange={e => setDueDate(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description:</label>
                        <textarea 
                            className="form-textarea"
                            value={description} 
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Enter assignment description"
                            rows="4"
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-button">
                        Add Assignment
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Assignments