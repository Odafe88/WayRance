import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
    registeredUser: false,
    regModal: false,
    wasteRecorded: 0,
    wasteValidated: 0,
    amountEarned: 0
})

export {setGlobalState, useGlobalState, getGlobalState}