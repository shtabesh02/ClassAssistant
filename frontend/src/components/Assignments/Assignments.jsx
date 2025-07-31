import { useState } from "react"
import './Assignments.css'
function Assignments() {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // const assignment = {
        //     title,
        //     dueDate,
        //     description
        // }
        alert('This page is under progress...')
    }
  return (
    <div className="assignments">
        <h1>Add the assignments here</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="title">
                <label htmlFor="">Title:</label>
                <input type="text" name="" id="" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="duedate">
                <label htmlFor="">Due Date</label>
                <input type="datetime-local" name="" id="" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div className="description">
                <label htmlFor="">Description</label>
                <textarea name="" id="" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>

    </div>
  )
}

export default Assignments