import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user_reducer";
import regModalReducer from "./regModal/regModal_reducer";
import wasteReducer from "./waste/waste_reducer";


const initialState = {
    registeredUser: false,
    admin: false,
    regModal: false,
    wasteRecorded: 0,
    wasteValidated: 0,
    amountEarned: 0,
};
  
const persistConfig = {
    key: 'root',
    storage
}
  
const rootReducer = combineReducers({
    user: userReducer,
    regModal: regModalReducer,
    waste: wasteReducer
});
  
export default persistReducer(persistConfig, rootReducer)