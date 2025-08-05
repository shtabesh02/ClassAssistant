import { csrfFetch } from "./csrf";

const LOADALLTHEUPCOMINGASSINGMENTS = 'loadalltheupcomingassingments';

// regular action to add assignments to state
const addAssingmenttostate = (assignments) => {
    return {
        type: LOADALLTHEUPCOMINGASSINGMENTS,
        assignments
    }
}
// thunk action to load assignment from db
export const loadassignments = () => async (dispatch) => {
    const response = await csrfFetch(`/api/assignment`);
    // console.log('assignments from thunk: ', response)
    if(response.ok){
        const data = await response.json();
        dispatch(addAssingmenttostate(data));
    }
}


// Thunk action to insert new assignment
export const addAnAssignment = (assignment) => async () => {
    // console.log('hit...')
    await csrfFetch(`/api/assignment`, {
        method: 'POST',
        body: JSON.stringify(assignment)
    });
    // console.log('response: ', response.json());
}

const initalState = {
    assignment: {}
}
const assignmentReducer = (state = initalState, action) => {
    switch(action.type){
        case LOADALLTHEUPCOMINGASSINGMENTS: {
            return{assignment: action.assignments}
        }
        default:
            return state
    }
}

export default assignmentReducer;