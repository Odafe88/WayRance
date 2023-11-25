import { legacy_createStore as createStore } from "redux";
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage' 

import userReducer from "../user/user_reducer";
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, userReducer)
 
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}