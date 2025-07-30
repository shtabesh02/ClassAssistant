import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { importStudents, loadStudents } from '../../store/students';
import './Students.css';

const Students = () => {
    const [excelFile, setExcelFile] = useState(null);
    const dispatch = useDispatch();
    const students = useSelector(state => Object.values(state.students))
    useEffect(() => {
        dispatch(loadStudents());
    }, [dispatch])

    const handleExcelChange = (e) => {
        setExcelFile(e.target.files[0])
    }
    const handleExcelSubmit = e => {
        e.preventDefault();
        if(!excelFile) return alert('Please selecte the list of students.');
        const formData = new FormData();
        formData.append('file', excelFile);
        dispatch(importStudents(formData)).then(() => {
            dispatch(loadStudents());
            setExcelFile(null);
        })

    }
  return (
    <div className="students">
        <h1>List of Students</h1>
        <hr />
        <form action="" onSubmit={handleExcelSubmit}>
            <label htmlFor="">Import students: </label>
            <input type="file" name="" id="" accept='.xlsx, .xls' onChange={handleExcelChange}/>
            <button type="submit">Upload</button>
            <label htmlFor=""><b>IMPORTANT</b>: Make sure your .xlsx file has these columns: first_name, last_name and email.</label>
        </form>
        <hr />
        <ul>
            <li><span>First Name</span><span>Last Name</span><span>Email</span></li>
            {students && students.map(student => (
            <li key={student.id}><span>{student.firstName}</span><span>{student.lastName}</span><span>{student.email}</span></li>
        ))}
        </ul>
    </div>
  )
}

export default Students