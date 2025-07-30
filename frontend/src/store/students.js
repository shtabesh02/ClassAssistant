import { csrfFetch } from "./csrf";

const ALLSTUDENTS = 'AllStudentsList';

// regular action to load the students
const load_students = (students) => {
    return {
        type: ALLSTUDENTS,
        students
    }
}
// thunk action to load the students
export const loadStudents = () => async (dispatch) =>{
    const response = await csrfFetch(`/api/students`);
    console.log('students at the redux: ', response)
    if(response.ok){
        const data = await response.json();

        dispatch(load_students(data))
    }
}

// thunk action to inset the imported list
const getCookie = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
}

export const importStudents = (studentslist) => async (dispatch) => {
    console.log('stdent on the way to db from store: ', studentslist)
    const token = getCookie('XSRF-TOKEN'); 
    const response = await fetch('/api/students/import', {
        method: 'POST',
        headers: {'X-CSRF-TOKEN': token},
        body: studentslist
    });
    if(response.ok){
        const data = await response.json();
        dispatch(loadStudents(data));
    }else{
        const err = await response.json();
        throw new Error(err.message || 'import failed.');
    }
}
const initalState = {
    students: {}
}
const studentsReducer = (state = initalState, action) => {
    switch(action.type){
        case ALLSTUDENTS: {
            return {...action.students}
        }
        default:
            return state;
    }
}

export default studentsReducer;