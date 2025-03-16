import { wasteActionTypes } from "./waste_types";

export const wasteRecorded = () => ({
    type: wasteActionTypes.WASTE_RECORDED,
    payload: waste
})

export const wasteValidated = () => ({
    type: wasteActionTypes.WASTE_VALIDATED,
    payload: waste
})