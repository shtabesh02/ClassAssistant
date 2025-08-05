import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnnouncement } from '../../store/announcement';
import { useNavigate } from 'react-router-dom';
import './Announcement.css';

const Announcement = () => {
    const [subject, setSubject] = useState('');
    const [msg, setMsg] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [fileNames, setFileNames] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAttachment = (e) => {
        const newFiles = Array.from(e.target.files);

        // Prevent duplicate files (optional)
        const fileSet = new Set(attachments.map(f => f.name));
        const mergedFiles = [...attachments];

        newFiles.forEach(file => {
            if (!fileSet.has(file.name)) {
                mergedFiles.push(file);
            }
        });

        setAttachments(mergedFiles);
        setFileNames(mergedFiles.map(f => f.name));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('msg', msg);
        for (let file of attachments) {
            formData.append('attachments', file)
        }
        await dispatch(addAnnouncement(formData))
        .then(() => {
            alert('Email sent succesfull.')
            navigate(`/`)
        });
        
    }
    return (
        <div className="announcement">
            <h1>Announcemnts</h1>

            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="">Subject</label>
                <input type="text" id='subject' required value={subject} onChange={e => setSubject(e.target.value)} />

                <label htmlFor="">Message</label>
                <textarea name="msg" id="msg" required value={msg} onChange={e => setMsg(e.target.value)} rows={5}></textarea>

                <label htmlFor="">Attach your files</label>
                <input type="file" name="" id="" multiple onChange={handleAttachment} />

                {fileNames.length > 0 && (
                    <ul>
                        {fileNames.map((f_name, idx) => (
                            <li key={idx}>{f_name}</li>
                        ))}
                    </ul>
                )}

                <label onClick={() => {
                    setAttachments([]);
                    setFileNames([]);
                }}>Clear Attachments</label>

                <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default Announcement