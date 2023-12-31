import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
// import rootReducer from './reducer/index';

export const Store= configureStore({
    reducer: rootReducer
})