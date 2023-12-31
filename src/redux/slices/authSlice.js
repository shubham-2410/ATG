import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    user : localStorage.getItem("user")!==("undefined"||null) ? JSON.parse(localStorage.getItem("user")) :null,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) :null
};

const  authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser:(state , value)=>{
            state.user = value.payload;
        },
        setToken(state , action){
            state.token = action.payload;
        },
    }
});

export const {setUser  , setToken} = authSlice.actions;
export default authSlice.reducer ;