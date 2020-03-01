import { USER_DETAILS,DETAILS_VIEW } from '../constants/index';

const initialState = {
    userData:[],
    userPersonalDetails:[]
};

function rootReducer(state = initialState, action) {
    if (action.type === USER_DETAILS) {
        return {
            ...state,
            userData: action.payload
        };
    }
    if (action.type === DETAILS_VIEW) {
        return { ...state, userPersonalDetails: action.personData };
      }
    return state;
}

export default rootReducer;
