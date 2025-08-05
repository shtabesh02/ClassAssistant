import { csrfFetch } from "./csrf";
const NEW_ANNOUNCEMENT = 'publishanewannouncement';
const LOADANNOUNCEMENTSdb = 'loadalltheannouncements';

// regular action to add announcement
const add_announcement = (announcement) => {
    return {
        type: NEW_ANNOUNCEMENT,
        announcement
    }
}


const getCookie = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
}

// thunk action to add new announcement
export const addAnnouncement = (announcement) => async (dispatch) => {
    const token = getCookie('XSRF-TOKEN'); 
    // console.log('attachments: ', announcement)
    const response = await fetch('/api/announcement', {
        method: 'POST',
        credential: 'include',
        headers: {'X-CSRF-TOKEN': token},
        body: announcement
        // headerr: {'Content-Type': 'multipart/form-data'},
        // headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify(announcement)
    });
    if(response.ok){
        const data = await response.json();
        dispatch(add_announcement(data))
    }
}


// regular action to load announcemnts to redux
const loadAnncments = (announcements) => {
    return {
        type: LOADANNOUNCEMENTSdb,
        announcements
    }
}
// thunk action to load announcements from db
export const loadannouncements = () => async (dispatch) => {
    // console.log('got hit...');
    const response = await csrfFetch(`/api/announcement`);
    // console.log('response at redux: ', response)
    if(response.ok){
        const data = await response.json();
        dispatch(loadAnncments(data));
    }
}

const initalState = {
    announcement: {}
}
const addAnnouncementReducer = (state = initalState, action) => {
    switch(action.type){
        case NEW_ANNOUNCEMENT: {
            return {...state, announcement: action.announcement}
        }
        case LOADANNOUNCEMENTSdb: {
            return {announcement: action.announcements}
        }
        default:
            return state
    }
}
export default addAnnouncementReducer