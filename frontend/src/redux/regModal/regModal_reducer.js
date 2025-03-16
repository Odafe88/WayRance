import { regModalTypes } from "./regModal_types";

const INITIAL_STATE = {
    regModal: false
}

const regModalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case regModalTypes.REGMODAL:
            return {
                ...state,
                regModal: !state.regModal
            }
    
        default:
            return state;
    }
}

export default regModalReducer;