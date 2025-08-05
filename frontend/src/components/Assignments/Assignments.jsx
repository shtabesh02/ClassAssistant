import { useState } from "react"
import { useDispatch } from 'react-redux';
import './Assignments.css'
import { addAnAssignment } from "../../store/assignment";
import { useNavigate } from "react-router-dom";
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
    <div className="assignments">
        <h1>Add the assignments here</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="title">
                <label htmlFor="">Title:</label>
                <input type="text" name="" id="" required value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="duedate">
                <label htmlFor="">Due Date</label>
                <input type="datetime-local" name="" id="" required value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div className="description">
                <label htmlFor="">Description</label>
                <textarea name="" id="" required value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>

    </div>
  )
}

export default Assignments