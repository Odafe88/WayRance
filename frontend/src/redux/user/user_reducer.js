import { userActionTypes } from "./user_types"

const INITIAL_STATE = {
    registeredUser: false,
    currentUser: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_REGISTERED_USER:
            return {
                ...state,
                isRegistered: action.payload
            }
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;