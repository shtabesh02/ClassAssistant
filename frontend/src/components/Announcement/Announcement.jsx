import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addAnnouncement } from '../../store/announcement';
import './Announcement.css'
const Announcement = () => {
    const [subject, setSubject] = useState('');
    const [msg, setMsg] = useState('');
    const [file, setFile] = useState();

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newAnnouncement = {
            subject,
            msg
        }
        dispatch(addAnnouncement(newAnnouncement));
        console.log('after click')
    }
    return (
        <div className="announcement">
            <h1>Announcemnts</h1>

            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="">Subject</label>
                <input type="text" id='subject' value={subject} onChange={e => setSubject(e.target.value)} />

                <label htmlFor="">Message</label>
                <textarea name="msg" id="msg" value={msg} onChange={e => setMsg(e.target.value)} rows={5}></textarea>

                <label htmlFor="">Attach your files</label>
                <input type="file" name="" id=""  onChange={e =>e.target.files}/>
                <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default Announcement