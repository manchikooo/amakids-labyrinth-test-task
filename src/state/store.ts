import {combineReducers, createStore} from 'redux';
import {matrixReducer} from "./reducer";

const rootReducer = combineReducers({
    matrix: matrixReducer
})
export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;