import { wasteActionTypes } from "./waste_types";


const INITIAL_STATE = {
    wasteRecorded: 0,
    wasteValidated: 0
}

const wasteReducer = (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case wasteActionTypes.WASTE_RECORDED:
            return {
                wasteRecorded: state.wasteRecorded + 1,
                ...state
            };
        case wasteActionTypes.WASTE_VALIDATED:
            return {
                ...state,
                wasteValidated: state.wasteValidated + 1,
            };
        default:
            return state;
    }
}

export default wasteReducer;