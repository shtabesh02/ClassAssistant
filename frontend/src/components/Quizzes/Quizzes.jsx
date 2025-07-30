import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Quizzes.css';

function Quizzes() {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const quiz = {
            title,
            dueDate,
            description
        }

    }
  return (
    <div className="quizzes">
        <h1>Quizzes</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="title">
                <label htmlFor="">Title</label>
                <input type="text" name="" id="" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="dueDate">
                <label htmlFor="">Due Date</label>
                <input type="datetime-local" name="" id="" value={dueDate} onChange={e => setDueDate(e.target.value)}/>
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

export default Quizzes