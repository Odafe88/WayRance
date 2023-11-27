import { userActionTypes } from "./user_types"

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
})

export const setRegisteredUser = (isRegistered) => ({
    type: userActionTypes.SET_REGISTERED_USER,
    payload: isRegistered,
  });