import { csrfFetch } from "./csrf";

const LOADALLTHEQUIZFROMDB = 'LoadAlltheqizfromdb';

// regular action
const quizzez = (quiz) => {
    return {
        type: LOADALLTHEQUIZFROMDB,
        quiz

    }
}
// thunk action to fetch quiz from db
export const loadallquizzes = () => async (dispatch) => {
    const response = await csrfFetch(`api/quiz`);
    if(response.ok){
        const data = await response.json();
        dispatch(quizzez(data))
    }
}

const initalState = {
    quiz: {}
}
const quizReducer = (state = initalState, action) => {
    switch(action.type){
        case LOADALLTHEQUIZFROMDB: {
            return {quiz: action.quiz}
        }
        default:
            return state
    }
}
export default quizReducer;