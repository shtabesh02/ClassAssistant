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

// Thunk action to add new quiz
export const addAQuiz = (quiz) => async (dispatch) => {
    const response = await csrfFetch(`api/quiz`, {
        method: 'POST',
        body: JSON.stringify(quiz)
    });
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