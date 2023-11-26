import React from "react"
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  registeredUser: false,
  admin: false,
  regModal: false,
  wasteRecorded: 0,
  wasteValidated: 0,
  amountEarned: 0
    
});

const persistStateKey = "globalState";

// // Custom hook to use global state with local storage persistence
// const usePersistedGlobalState = () => {
//    const [globalState, setGlobal] = useGlobalState("globalState");

//     // Load state from local storage on component mount
//     React.useEffect(() => {
//         const persistedState = localStorage.getItem(persistStateKey);

//         if (persistedState) {
//             setGlobal(JSON.parse(persistedState));
//         }
//     }, []);

//     // Save state to local storage whenever global state changes
//     React.useEffect(() => {
//         localStorage.setItem(persistStateKey, JSON.stringify(globalState));
//     }, [globalState, setGlobal]);

//     return [globalState, setGlobal];
// };

export { useGlobalState, setGlobalState };


